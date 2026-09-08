package io.yak.website.account;

import io.yak.website.account.WebsiteAccountModels.CompleteRegistrationRequest;
import io.yak.website.account.WebsiteAccountModels.CurrentUserResponse;
import io.yak.website.account.WebsiteAccountModels.EmailRequest;
import io.yak.website.account.WebsiteAccountModels.LoginRequest;
import io.yak.website.account.WebsiteAccountModels.MessageResponse;
import io.yak.website.account.WebsiteAccountModels.RegistrationEmailRequest;
import io.yak.website.account.WebsiteAccountModels.RegistrationVerificationResponse;
import io.yak.website.account.WebsiteAccountModels.ResetPasswordRequest;
import io.yak.website.account.WebsiteAccountModels.VerifyRegistrationCodeRequest;
import io.yak.website.common.ApiResponse;
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
    public ApiResponse<MessageResponse> requestRegistrationCode(
            @Valid @RequestBody RegistrationEmailRequest request,
            HttpServletRequest httpRequest) {
        return ApiResponse.success(accountService.requestRegistrationCode(request, httpRequest));
    }

    @PostMapping("/register/verify-code")
    public ApiResponse<RegistrationVerificationResponse> verifyRegistrationCode(
            @Valid @RequestBody VerifyRegistrationCodeRequest request,
            HttpServletRequest httpRequest) {
        return ApiResponse.success(accountService.verifyRegistrationCode(request, httpRequest));
    }

    @PostMapping("/register/complete")
    public ApiResponse<CurrentUserResponse> completeRegistration(
            @Valid @RequestBody CompleteRegistrationRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        return ApiResponse.success(accountService.completeRegistration(request, httpRequest, httpResponse));
    }

    @PostMapping("/login")
    public ApiResponse<CurrentUserResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        return ApiResponse.success(accountService.login(request, httpRequest, httpResponse));
    }

    @GetMapping("/current")
    public ApiResponse<CurrentUserResponse> current(HttpServletRequest request) {
        return ApiResponse.success(accountService.current(request));
    }

    @PostMapping("/logout")
    public ApiResponse<MessageResponse> logout(
            HttpServletRequest request,
            HttpServletResponse response) {
        return ApiResponse.success(accountService.logout(request, response));
    }

    @PostMapping("/forgot-password")
    public ApiResponse<MessageResponse> forgotPassword(
            @Valid @RequestBody EmailRequest request,
            HttpServletRequest httpRequest) {
        return ApiResponse.success(accountService.forgotPassword(request, httpRequest));
    }

    @PostMapping("/reset-password")
    public ApiResponse<MessageResponse> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {
        return ApiResponse.success(accountService.resetPassword(request));
    }
}
