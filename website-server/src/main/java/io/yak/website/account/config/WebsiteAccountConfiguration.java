package io.yak.website.account.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration(proxyBeanMethods = false)
public class WebsiteAccountConfiguration {

    @Bean
    public PasswordEncoder websitePasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
