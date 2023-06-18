package prompt.store.backend.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import prompt.store.backend.entity.RestBean;

public interface AuthorizeService extends UserDetailsService {

    //发送验证邮件
    String sendVerifyEmail(String email);

    boolean verifyEmailCode(String email, String code);

}
