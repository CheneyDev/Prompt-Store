package prompt.store.backend.service;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface AuthorizeService extends UserDetailsService {

    //发送验证邮件
    boolean sendVerifyEmail(String email);

    boolean verifyEmailCode(String email, String code);

    boolean verifyUsername(String username);
    boolean verifyEmail(String email);

    boolean register(String username, String email, String password);

    boolean resetPassword(String email, String password);

}
