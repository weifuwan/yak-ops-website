package io.yak.website.docs;

import io.yak.framework.security.context.CurrentUser;
import io.yak.website.account.WebsiteAccountModels.Profile;
import io.yak.website.account.WebsiteAccountRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

/** Ensures protected docs are visible only to verified Website members. */
@Component
public class ProtectedDocsAccessGuard {

    private final CurrentUser currentUser;
    private final WebsiteAccountRepository accountRepository;

    public ProtectedDocsAccessGuard(
            CurrentUser currentUser,
            WebsiteAccountRepository accountRepository) {
        this.currentUser = currentUser;
        this.accountRepository = accountRepository;
    }

    public void requireVerifiedWebsiteUser() {
        if (!currentUser.isAuthenticated() || currentUser.getUserId() == null) {
            throw new ProtectedDocsException(HttpStatus.UNAUTHORIZED, "请先登录");
        }

        Profile profile = accountRepository
                .findProfileBySecurityUserId(currentUser.getUserId())
                .orElseThrow(() -> new ProtectedDocsException(
                        HttpStatus.FORBIDDEN,
                        "当前账号没有文档访问权限"));

        if (!profile.emailVerified()) {
            throw new ProtectedDocsException(
                    HttpStatus.FORBIDDEN,
                    "请先完成邮箱验证");
        }
    }
}
