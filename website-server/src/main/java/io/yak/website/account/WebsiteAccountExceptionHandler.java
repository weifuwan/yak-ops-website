package io.yak.website.account;

import io.yak.framework.common.Result;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackageClasses = WebsiteAccountController.class)
public class WebsiteAccountExceptionHandler {

    @ExceptionHandler(WebsiteAccountException.class)
    public ResponseEntity<Result<Void>> handleAccountException(
            WebsiteAccountException exception) {
        HttpStatus status = exception.getStatus();
        return ResponseEntity.status(status)
                .body(Result.fail(status.value(), exception.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Result<Void>> handleValidationException(
            MethodArgumentNotValidException exception) {
        String message = exception.getBindingResult()
                .getFieldErrors()
                .stream()
                .findFirst()
                .map(error -> error.getField() + " " + error.getDefaultMessage())
                .orElse("请求参数无效");
        return ResponseEntity.badRequest()
                .body(Result.fail(HttpStatus.BAD_REQUEST.value(), message));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Result<Void>> handleConstraintViolation(
            ConstraintViolationException exception) {
        return ResponseEntity.badRequest()
                .body(Result.fail(HttpStatus.BAD_REQUEST.value(), "请求参数无效"));
    }
}
