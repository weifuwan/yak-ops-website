package io.yak.website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan("io.yak.website")
public class YakOpsWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(YakOpsWebsiteApplication.class, args);
    }
}
