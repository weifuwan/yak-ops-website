package io.yak.website.account.domain;

import org.springframework.http.HttpStatus;

public class WebsiteAccountException extends RuntimeException {

    private final HttpStatus status;

    public WebsiteAccountException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
