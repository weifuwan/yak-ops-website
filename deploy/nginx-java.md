# Nginx + Java JAR

Deploy Yak Ops Website on a Linux host with Nginx serving the frontend and the Spring Boot backend running directly with `java -jar`.

> This is repository-internal deployment documentation for `yak-ops-website`. It is intentionally kept under `deploy/` instead of `docs/` so it is not exposed as Yak Ops product documentation.

The deployment model stays simple:

```text
Browser
   |
   v
Nginx :80 / :443
   |-- /              -> website-ui static files
   `-- /api/*         -> 127.0.0.1:8080
                              |
                              v
                        website-server.jar
                              |
                              v
                            MySQL
```

## Prerequisites

Make sure the server has:

- Node.js 20+
- Java 21
- Maven 3.9+
- Nginx
- A reachable MySQL instance

## Build the project

Clone the repository and enter the project directory:

```bash
git clone https://github.com/weifuwan/yak-ops-website.git
cd yak-ops-website
```

Build the backend JAR:

```bash
mvn -pl website-server -am clean package -DskipTests
```

The executable JAR is generated under:

```text
website-server/target/website-server-1.0.0-SNAPSHOT.jar
```

Build the frontend:

```bash
cd website-ui
npm install
npm run build
cd ..
```

The production frontend files are generated under:

```text
website-ui/dist/
```

## Deploy the frontend with Nginx

Create a directory for the static files:

```bash
sudo mkdir -p /var/www/yak-ops-website
sudo rsync -a --delete website-ui/dist/ /var/www/yak-ops-website/
```

Create an Nginx server configuration, for example `/etc/nginx/conf.d/yak-ops-website.conf`:

```nginx
server {
    listen 80;
    server_name your-domain.example.com;

    root /var/www/yak-ops-website;
    index index.html;

    add_header Referrer-Policy "no-referrer" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Replace `your-domain.example.com` with the real domain name.

Check and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

The `try_files` fallback is required because the frontend uses client-side routing. Requests such as `/login`, `/register`, and `/docs/...` must still return `index.html` when they are opened directly in the browser.

## Configure the backend

The backend reads deployment configuration from environment variables. At minimum, configure the HTTP port and MySQL connection before starting the JAR:

```bash
export SERVER_PORT=8080
export DB_URL='jdbc:mysql://127.0.0.1:3306/yak_ops_website?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai&useSSL=false&allowPublicKeyRetrieval=true'
export DB_USERNAME='root'
export DB_PASSWORD='change-me'

export WEBSITE_PUBLIC_BASE_URL='http://your-domain.example.com'
export WEBSITE_SESSION_COOKIE_SECURE=false
```

For an HTTPS production deployment, use the public HTTPS URL and enable secure cookies:

```bash
export WEBSITE_PUBLIC_BASE_URL='https://your-domain.example.com'
export WEBSITE_SESSION_COOKIE_SECURE=true
```

Mail configuration is controlled by `WEBSITE_MAIL_*` and `MAIL_*`. Use `.env.example` as the reference when registration and password-reset emails need to be delivered through SMTP. Do not commit real database or SMTP passwords.

## Run the backend with `java -jar`

Copy the JAR to the deployment directory:

```bash
sudo mkdir -p /opt/yak-ops-website
sudo cp website-server/target/website-server-1.0.0-SNAPSHOT.jar /opt/yak-ops-website/website-server.jar
cd /opt/yak-ops-website
```

Start the backend directly:

```bash
java -jar website-server.jar
```

For a simple background process without introducing an additional process manager:

```bash
nohup java -jar website-server.jar > website-server.log 2>&1 &
```

The backend listens on port `8080` when `SERVER_PORT=8080`, while Nginx remains the public entry point.

## Verify the deployment

Check the backend health endpoint locally:

```bash
curl http://127.0.0.1:8080/actuator/health
```

A healthy backend should return a response with `"status":"UP"`.

Check Nginx:

```bash
curl -I http://your-domain.example.com/
```

Then open the site in a browser and verify that frontend pages load and `/api/*` requests are proxied successfully.

## Upgrade

Pull the latest code and rebuild both parts:

```bash
git pull
mvn -pl website-server -am clean package -DskipTests

cd website-ui
npm install
npm run build
cd ..
```

Replace the deployed frontend files:

```bash
sudo rsync -a --delete website-ui/dist/ /var/www/yak-ops-website/
sudo systemctl reload nginx
```

Replace the backend JAR and restart the existing Java process:

```bash
sudo cp website-server/target/website-server-1.0.0-SNAPSHOT.jar /opt/yak-ops-website/website-server.jar
cd /opt/yak-ops-website
java -jar website-server.jar
```

This guide intentionally keeps the runtime model to Nginx plus a standalone Spring Boot JAR. A systemd unit, container runtime, or process supervisor can be added later if automatic restart and boot-time startup are required.
