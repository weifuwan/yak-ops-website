package io.yak.website.account;

import io.yak.framework.common.Result;
import io.yak.website.account.WebsiteAccountModels.CompleteRegistrationRequest;
import io.yak.website.account.WebsiteAccountModels.CurrentUserResponse;
import io.yak.website.account.WebsiteAccountModels.EmailRequest;
import io.yak.website.account.WebsiteAccountModels.LoginRequest;
import io.yak.website.account.WebsiteAccountModels.MessageResponse;
import io.yak.website.account.WebsiteAccountModels.RegistrationEmailRequest;
import io.yak.website.account.WebsiteAccountModels.RegistrationVerificationResponse;
import io.yak.website.account.WebsiteAccountModels.ResetPasswordRequest;
import io.yak.website.account.WebsiteAccountModels.VerifyRegistrationCodeRequest;
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

    @PostMapping("/register/request-code")
    public Result<MessageResponse> requestRegistrationCode(
            @Valid @RequestBody RegistrationEmailRequest request,
            HttpServletRequest httpRequest) {
        return Result.success(accountService.requestRegistrationCode(request, httpRequest));
    }

    @PostMapping("/register/verify-code")
    public Result<RegistrationVerificationResponse> verifyRegistrationCode(
            @Valid @RequestBody VerifyRegistrationCodeRequest request,
            HttpServletRequest httpRequest) {
        return Result.success(accountService.verifyRegistrationCode(request, httpRequest));
    }

    @PostMapping("/register/complete")
    public Result<CurrentUserResponse> completeRegistration(
            @Valid @RequestBody CompleteRegistrationRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        return Result.success(accountService.completeRegistration(request, httpRequest, httpResponse));
    }

    @PostMapping("/login")
    public Result<CurrentUserResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        return Result.success(accountService.login(request, httpRequest, httpResponse));
    }

    @GetMapping("/current")
    public Result<CurrentUserResponse> current(HttpServletRequest request) {
        return Result.success(accountService.current(request));
    }

    @PostMapping("/logout")
    public Result<MessageResponse> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        return Result.success(accountService.logout(request, response));
    }

    @PostMapping("/forgot-password")
    public Result<MessageResponse> forgotPassword(
            @Valid @RequestBody EmailRequest request,
            HttpServletRequest httpRequest) {
        return Result.success(accountService.forgotPassword(request, httpRequest));
    }

    @PostMapping("/reset-password")
    public Result<MessageResponse> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        return Result.success(accountService.resetPassword(request));
    }
}
