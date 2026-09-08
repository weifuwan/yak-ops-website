# Nginx + Java JAR

Deploy Yak Ops Website on a Linux host with the frontend served by the official `nginx:latest` image and the Spring Boot backend running directly with `java -jar`.

> This is repository-internal deployment documentation for `yak-ops-website`. It is intentionally kept under `deploy/` instead of `docs/` so it is not exposed as Yak Ops product documentation.

The deployment model stays simple:

```text
Browser
   |
   v
nginx:latest :80
   |-- /              -> website-ui/dist
   `-- /api/*         -> 127.0.0.1:8080
                              |
                              v
                        website-server.jar
                              |
                              v
                            MySQL
```

## Prerequisites

Make sure the Linux server has:

- Node.js 20+
- Java 21
- Maven 3.9+
- Docker
- `nginx:latest` image
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

The frontend output is generated under:

```text
website-ui/dist/
```

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

For a simple background process:

```bash
nohup java -jar website-server.jar > website-server.log 2>&1 &
```

The backend listens on port `8080` when `SERVER_PORT=8080`.

## Run the frontend with `nginx:latest`

The repository already contains the complete Nginx configuration:

```text
deploy/nginx/nginx.conf
```

It serves the SPA from `/usr/share/nginx/html` and proxies `/api/*` to `127.0.0.1:8080`.

From the repository root, start Nginx with one Docker command:

```bash
docker run -d \
  --name yak-ops-website-nginx \
  --restart unless-stopped \
  --network host \
  -v "$(pwd)/website-ui/dist:/usr/share/nginx/html:ro" \
  -v "$(pwd)/deploy/nginx/nginx.conf:/etc/nginx/nginx.conf:ro" \
  nginx:latest
```

`--network host` is intentional. The Java backend runs directly on the Linux host, so host networking allows the Nginx container to proxy `/api/*` to `127.0.0.1:8080` without an extra Docker network or `host.docker.internal` mapping.

Because host networking is used, do not add `-p 80:80`. Make sure port `80` on the host is available before starting the container.

The Nginx configuration also contains the SPA fallback:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

This is required for routes such as `/login`, `/register`, and `/docs/...` when they are opened directly in the browser.

## Verify the deployment

Check the backend health endpoint locally:

```bash
curl http://127.0.0.1:8080/actuator/health
```

A healthy backend should return a response with `"status":"UP"`.

Check the Nginx container:

```bash
docker ps --filter name=yak-ops-website-nginx
```

Check the website:

```bash
curl -I http://127.0.0.1/
```

Then open the public domain in a browser and verify that frontend pages load and `/api/*` requests are proxied successfully.

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

Replace and restart the backend JAR:

```bash
sudo cp website-server/target/website-server-1.0.0-SNAPSHOT.jar /opt/yak-ops-website/website-server.jar
```

The frontend is bind-mounted into the Nginx container. After rebuilding the frontend, recreate the Nginx container with the same `docker run` command when necessary so the container uses the latest build and configuration.

This deployment intentionally keeps the runtime model small: one `nginx:latest` container for the frontend and one standalone Spring Boot JAR for the backend.
