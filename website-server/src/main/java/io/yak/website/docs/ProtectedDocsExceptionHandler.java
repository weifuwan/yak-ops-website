package io.yak.website.docs;

import io.yak.framework.common.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackageClasses = ProtectedDocsController.class)
public class ProtectedDocsExceptionHandler {

    @ExceptionHandler(ProtectedDocsException.class)
    public ResponseEntity<Result<Void>> handleDocsException(
            ProtectedDocsException exception) {
        return ResponseEntity
                .status(exception.getStatus())
                .body(Result.fail(
                        exception.getStatus().value(),
                        exception.getMessage()));
    }
}
