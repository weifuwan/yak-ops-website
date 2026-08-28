package io.yak.website.docs;

import org.springframework.http.HttpStatus;

public class ProtectedDocsException extends RuntimeException {

    private final HttpStatus status;

    public ProtectedDocsException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
