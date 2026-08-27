package io.yak.website.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public final class WebsiteAccountModels {

    private WebsiteAccountModels() {
    }

    public record RegisterRequest(
            @NotBlank @Email @Size(max = 128) String email,
            @NotBlank @Size(min = 8, max = 64) String password,
            @Size(max = 64) String source,
            @Size(max = 128) String utmSource,
            @Size(max = 128) String utmMedium,
            @Size(max = 256) String utmCampaign) {
    }

    public record LoginRequest(
            @NotBlank @Email @Size(max = 128) String email,
            @NotBlank @Size(min = 8, max = 64) String password) {
    }

    public record EmailRequest(
            @NotBlank @Email @Size(max = 128) String email) {
    }

    public record VerifyEmailRequest(
            @NotBlank @Size(max = 256) String token) {
    }

    public record ResetPasswordRequest(
            @NotBlank @Size(max = 256) String token,
            @NotBlank @Size(min = 8, max = 64) String password) {
    }

    public record MessageResponse(String message) {
    }

    public record CurrentUserResponse(
            Long id,
            String email,
            String displayName,
            boolean emailVerified) {
    }

    public record Profile(
            Long id,
            Long securityUserId,
            String email,
            boolean emailVerified) {
    }

    public record TokenRecord(Long id, Long securityUserId) {
    }

    public enum TokenPurpose {
        VERIFY_EMAIL,
        RESET_PASSWORD
    }
}
