package io.yak.website.docs;

import io.yak.website.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackageClasses = ProtectedDocsController.class)
public class ProtectedDocsExceptionHandler {

    @ExceptionHandler(ProtectedDocsException.class)
    public ResponseEntity<ApiResponse<Void>> handleDocsException(
            ProtectedDocsException exception) {
        return ResponseEntity
                .status(exception.getStatus())
                .body(ApiResponse.fail(
                        exception.getStatus().value(),
                        exception.getMessage()));
    }
}
