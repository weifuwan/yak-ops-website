package io.yak.website.docs;

import io.yak.website.account.WebsiteSessionService;
import io.yak.website.account.entity.WebsiteUser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/** Ensures protected docs are visible only to verified Website members. */
@Component
public class ProtectedDocsAccessGuard {

    private final WebsiteSessionService sessionService;

    public ProtectedDocsAccessGuard(WebsiteSessionService sessionService) {
        this.sessionService = sessionService;
    }

    public WebsiteUser requireVerifiedWebsiteUser(HttpServletRequest request) {
        return sessionService.currentUser(request)
                .orElseThrow(() -> new ProtectedDocsException(
                        HttpStatus.UNAUTHORIZED,
                        "请先登录"));
    }
}
