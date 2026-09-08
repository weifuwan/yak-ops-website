package io.yak.website.docs;

import io.yak.website.account.domain.WebsiteSessionRegistry;
import io.yak.website.account.domain.WebsiteUser;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/** Ensures protected docs are visible only to verified Website members. */
@Component
public class ProtectedDocsAccessGuard {

    private final WebsiteSessionRegistry sessions;

    public ProtectedDocsAccessGuard(WebsiteSessionRegistry sessions) {
        this.sessions = sessions;
    }

    public WebsiteUser requireVerifiedWebsiteUser(HttpServletRequest request) {
        return sessions.currentUser(request)
                .orElseThrow(() -> new ProtectedDocsException(
                        HttpStatus.UNAUTHORIZED,
                        "请先登录"));
    }
}
