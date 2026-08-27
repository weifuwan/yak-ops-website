package io.yak.website.account;

import io.yak.framework.common.Result;
import io.yak.framework.security.web.PublicEndpoint;
import io.yak.website.account.WebsiteAccountModels.CurrentUserResponse;
import io.yak.website.account.WebsiteAccountModels.EmailRequest;
import io.yak.website.account.WebsiteAccountModels.LoginRequest;
import io.yak.website.account.WebsiteAccountModels.MessageResponse;
import io.yak.website.account.WebsiteAccountModels.RegisterRequest;
import io.yak.website.account.WebsiteAccountModels.ResetPasswordRequest;
import io.yak.website.account.WebsiteAccountModels.VerifyEmailRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class WebsiteAccountController {

    private final WebsiteAccountService accountService;

    public WebsiteAccountController(WebsiteAccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/register")
    @PublicEndpoint
    public Result<MessageResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpRequest) {
        return Result.success(accountService.register(request, httpRequest));
    }

    @PostMapping("/verify-email")
    @PublicEndpoint
    public Result<MessageResponse> verifyEmail(
            @Valid @RequestBody VerifyEmailRequest request) {
        return Result.success(accountService.verifyEmail(request));
    }

    @PostMapping("/resend-verification")
    @PublicEndpoint
    public Result<MessageResponse> resendVerification(
            @Valid @RequestBody EmailRequest request,
            HttpServletRequest httpRequest) {
        return Result.success(accountService.resendVerification(request, httpRequest));
    }

    @PostMapping("/login")
    @PublicEndpoint
    public Result<CurrentUserResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        return Result.success(accountService.login(request, httpRequest, httpResponse));
    }

    @GetMapping("/current")
    public Result<CurrentUserResponse> current() {
        return Result.success(accountService.current());
    }

    @PostMapping("/logout")
    public Result<MessageResponse> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        return Result.success(accountService.logout(request, response));
    }

    @PostMapping("/forgot-password")
    @PublicEndpoint
    public Result<MessageResponse> forgotPassword(
            @Valid @RequestBody EmailRequest request,
            HttpServletRequest httpRequest) {
        return Result.success(accountService.forgotPassword(request, httpRequest));
    }

    @PostMapping("/reset-password")
    @PublicEndpoint
    public Result<MessageResponse> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        return Result.success(accountService.resetPassword(request));
    }
}
