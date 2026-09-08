package io.yak.website.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public final class WebsiteAccountModels {

    private WebsiteAccountModels() {
    }

    public record RegistrationEmailRequest(
            @NotBlank @Email @Size(max = 128) String email,
            @Size(max = 64) String source,
            @Size(max = 128) String utmSource,
            @Size(max = 128) String utmMedium,
            @Size(max = 256) String utmCampaign) {
    }

    public record VerifyRegistrationCodeRequest(
            @NotBlank @Email @Size(max = 128) String email,
            @NotBlank @Pattern(regexp = "\\d{6}") String code) {
    }

    public record CompleteRegistrationRequest(
            @NotBlank @Size(max = 256) String setupToken,
            @NotBlank @Size(min = 8, max = 64) String password) {
    }

    public record LoginRequest(
            @NotBlank @Email @Size(max = 128) String email,
            @NotBlank @Size(min = 8, max = 64) String password) {
    }

    public record EmailRequest(
            @NotBlank @Email @Size(max = 128) String email) {
    }

    public record ResetPasswordRequest(
            @NotBlank @Size(max = 256) String token,
            @NotBlank @Size(min = 8, max = 64) String password) {
    }

    public record MessageResponse(String message) {
    }

    public record RegistrationVerificationResponse(
            String setupToken,
            String message) {
    }

    public record CurrentUserResponse(
            Long id,
            String email,
            String displayName,
            boolean emailVerified) {
    }
}
