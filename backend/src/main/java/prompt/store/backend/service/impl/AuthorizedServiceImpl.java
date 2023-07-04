package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Account;
import prompt.store.backend.mapper.AccountMapper;
import prompt.store.backend.service.AuthorizeService;
import prompt.store.backend.utils.ResendApiUtil;

import java.io.IOException;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.util.concurrent.TimeUnit;

@Service
public class AuthorizedServiceImpl implements AuthorizeService {

    @Resource
    AccountMapper accountMapper;
    @Resource
    RedisTemplate<String, String> redisTemplate;
    @Resource
    ResendApiUtil resendApiUtil;

    BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username == null || username.isEmpty()) {
            throw new UsernameNotFoundException("用户名不能为空");
        }
        Account account = accountMapper.findAccountByUsernameOrEmail(username);
        if (account == null) {
            throw new UsernameNotFoundException("用户不存在");
        }
        return User
                .withUsername(account.getUsername())
                .password(account.getPassword())
                .roles(account.getRole())
                .build();
    }

    @Override
    public boolean sendVerifyEmail(String email) {
        String verifyCode = String.valueOf((int) ((Math.random() * 9 + 1) * 100000));
        redisTemplate.opsForValue().set(email, verifyCode, 5, TimeUnit.MINUTES);
        try {
            resendApiUtil.sendEmail("onboarding@resend.dev", email, "Prompt Store 验证码", "您的验证码是：" + verifyCode + "，有效期5分钟。");
        } catch (InterruptedException | IOException | URISyntaxException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    //验证邮箱验证码
    @Override
    public boolean verifyEmailCode(String email, String code) {
        String verifyCode = redisTemplate.opsForValue().get(email);
        if (verifyCode == null) {
            return false;
        }
        return verifyCode.equals(code);
    }


    @Override
    public boolean verifyUsername(String username) {
        Account account = accountMapper.findAccountByUsernameOrEmail(username);
        return account != null;
    }

    @Override
    public boolean verifyEmail(String email) {
        Account account = accountMapper.findAccountByUsernameOrEmail(email);
        return account != null;
    }

    @Override
    public boolean register(String username, String email, String password) {
        //加密密码
        String encodePassword = bCryptPasswordEncoder.encode(password);
        //将用户信息存入数据库
//        生成现在时间与 MySQL 中的 timestamp 类型对应的时间
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        accountMapper.insertAccount(username, email, encodePassword, String.valueOf(timestamp));
        return true;
    }

    @Override
    public boolean resetPassword(String email, String password) {
        //加密密码
        String encodePassword = bCryptPasswordEncoder.encode(password);
        //将用户信息存入数据库
        accountMapper.updatePasswordByEmail(email, encodePassword);
        return true;
    }
}
