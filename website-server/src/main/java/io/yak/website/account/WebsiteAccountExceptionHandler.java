package io.yak.website.account;

import io.yak.framework.common.ErrorCode;
import io.yak.framework.common.Result;
import io.yak.framework.security.common.enums.ResultCode;
import io.yak.framework.security.exception.YakSecurityException;
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

    @ExceptionHandler(YakSecurityException.class)
    public ResponseEntity<Result<Void>> handleSecurityException(
            YakSecurityException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        if (errorCode == ResultCode.USER_ACCOUNT_LOCKED) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Result.fail(HttpStatus.TOO_MANY_REQUESTS.value(), "登录尝试过多，请稍后再试"));
        }
        if (errorCode == ResultCode.USER_CREDENTIALS_ERROR
                || errorCode == ResultCode.USER_ACCOUNT_NOT_EXIST
                || errorCode == ResultCode.USER_NOT_EXISTS) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Result.fail(HttpStatus.UNAUTHORIZED.value(), "邮箱或密码错误"));
        }
        if (errorCode == ResultCode.USER_ACCOUNT_DISABLE) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Result.fail(HttpStatus.FORBIDDEN.value(), "账号尚未激活或已被禁用"));
        }
        String message = errorCode == null ? "账户操作失败" : errorCode.getMessage();
        return ResponseEntity.badRequest()
                .body(Result.fail(HttpStatus.BAD_REQUEST.value(), message));
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
