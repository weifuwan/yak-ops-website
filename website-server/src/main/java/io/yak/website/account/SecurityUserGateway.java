package io.yak.website.account;

import io.yak.framework.common.Result;
import io.yak.framework.security.common.dto.account.AccountLoginDTO;
import io.yak.framework.security.common.dto.user.UserDTO;
import io.yak.framework.security.common.dto.user.UserPasswordResetDTO;
import io.yak.framework.security.common.entity.user.User;
import io.yak.framework.security.common.po.UserPO;
import io.yak.framework.security.dao.UserDao;
import io.yak.framework.security.extend.PasswordEncoder;
import io.yak.framework.security.service.LoginService;
import io.yak.framework.security.service.UserService;
import io.yak.framework.security.service.impl.UserAdministrationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.HexFormat;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserGateway {

    private static final int STATUS_ENABLED = 1;
    private static final int STATUS_DISABLED = 2;

    private final UserDao userDao;
    private final UserService userService;
    private final LoginService loginService;
    private final UserAdministrationService userAdministrationService;
    private final PasswordEncoder passwordEncoder;

    public SecurityUserGateway(
            UserDao userDao,
            UserService userService,
            LoginService loginService,
            UserAdministrationService userAdministrationService,
            PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.userService = userService;
        this.loginService = loginService;
        this.userAdministrationService = userAdministrationService;
        this.passwordEncoder = passwordEncoder;
    }

    public User findByEmail(String email) {
        return userDao.selectByUserMail(email);
    }

    public User findByUsername(String username) {
        return userDao.selectByUsername(username);
    }

    public User findById(Long userId) {
        return userDao.selectByUserId(userId);
    }

    public User provisionPending(String email, String password) {
        User existing = findByEmail(email);
        if (existing != null) {
            ensureStatus(existing.getId(), STATUS_DISABLED);
            return findById(existing.getId());
        }

        String username = internalUsername(email);
        UserDTO user = new UserDTO();
        user.setUserName(username);
        user.setPw(password);
        user.setEmail(email);
        user.setRealName(defaultDisplayName(email));
        user.setPhone("");
        user.setRoleIds(Collections.emptyList());

        try {
            Result<Void> result = userService.addUser(user, "website-registration");
            if (result.failed()) {
                throw new WebsiteAccountException(
                        HttpStatus.BAD_REQUEST,
                        result.getMessage() == null ? "注册失败" : result.getMessage());
            }
        } catch (RuntimeException exception) {
            User raced = findByEmail(email);
            if (raced == null) {
                if (exception instanceof WebsiteAccountException accountException) {
                    throw accountException;
                }
                throw new WebsiteAccountException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "注册失败，请稍后重试");
            }
        }

        User created = findByEmail(email);
        if (created == null || created.getId() == null) {
            throw new WebsiteAccountException(HttpStatus.INTERNAL_SERVER_ERROR, "注册失败");
        }
        ensureStatus(created.getId(), STATUS_DISABLED);
        return findById(created.getId());
    }

    public void enable(Long userId) {
        ensureStatus(userId, STATUS_ENABLED);
    }

    public boolean credentialsMatch(String email, String password) {
        User user = findByEmail(email);
        return user != null
                && user.getPw() != null
                && passwordEncoder.matches(password, user.getPw());
    }

    public User login(
            String email,
            String password,
            HttpServletRequest request,
            HttpServletResponse response) {
        User user = findByEmail(email);
        if (user == null) {
            throw new WebsiteAccountException(HttpStatus.UNAUTHORIZED, "邮箱或密码错误");
        }

        AccountLoginDTO login = new AccountLoginDTO();
        login.setUserName(user.getUserName());
        login.setPw(password);
        loginService.verifyLogin(login, request, response);
        return user;
    }

    public void logout(HttpServletRequest request, HttpServletResponse response) {
        loginService.logout(request, response);
    }

    public void resetPassword(Long userId, String password) {
        UserPasswordResetDTO reset = new UserPasswordResetDTO();
        reset.setPassword(password);
        userAdministrationService.resetPassword(
                userId,
                reset,
                "website-self-service");
    }

    private void ensureStatus(Long userId, int status) {
        if (userId == null) {
            throw new WebsiteAccountException(HttpStatus.INTERNAL_SERVER_ERROR, "用户状态异常");
        }
        User current = findById(userId);
        if (current == null) {
            throw new WebsiteAccountException(HttpStatus.NOT_FOUND, "用户不存在");
        }
        if (current.getStatus() != null && current.getStatus() == status) {
            return;
        }
        UserPO update = new UserPO();
        update.setId(userId);
        update.setStatus(status);
        if (userDao.editUser(update) != 1) {
            throw new WebsiteAccountException(HttpStatus.INTERNAL_SERVER_ERROR, "用户状态更新失败");
        }
    }

    private String internalUsername(String email) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            String hash = HexFormat.of().formatHex(
                    digest.digest(email.getBytes(StandardCharsets.UTF_8)));
            return "web_" + hash.substring(0, 32);
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 is not available", exception);
        }
    }

    private String defaultDisplayName(String email) {
        int separator = email.indexOf('@');
        String local = separator > 0 ? email.substring(0, separator) : "Yak Ops User";
        return local.length() <= 64 ? local : local.substring(0, 64);
    }
}
