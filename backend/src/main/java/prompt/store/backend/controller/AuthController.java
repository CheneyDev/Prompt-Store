package prompt.store.backend.controller;


import jakarta.annotation.Resource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.AuthorizeService;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Resource
    AuthorizeService authorizeService;

    @RequestMapping("/isLogin")
    public RestBean isLogin() {
        //获取当前用户
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName = user.getUsername();
        return RestBean.success(userName);
    }

    @PostMapping("/getVerifyCode")
    public RestBean<String> getVerifyCode(@RequestParam("email") String email) {
        boolean result = authorizeService.sendVerifyEmail(email);
        return RestBean.success(String.valueOf(result));
    }

    @PostMapping("/verifyUsername")
    public RestBean<String> verifyUsername(@RequestParam("username") String username) {

        boolean result = authorizeService.verifyUsername(username);
        if (result) {
            return RestBean.success("true");
        } else {
            return RestBean.success("false");
        }
    }

    @PostMapping("/register")
    public RestBean<String> register(@RequestParam("username") String username,
                                     @RequestParam("email") String email,
                                     @RequestParam("password") String password,
                                     @RequestParam("verifyCode") String verifyCode) {
        boolean result = false;
        if (authorizeService.verifyEmailCode(email, verifyCode) && authorizeService.verifyUsername(username) && authorizeService.verifyEmail(email)) {
            result = authorizeService.register(username, email, password);
        }
        return RestBean.success(String.valueOf(result));
    }

    @PostMapping("/resetPassword")
    public RestBean<String> resetPassword(@RequestParam("email") String email,
                                          @RequestParam("password") String password,
                                          @RequestParam("verifyCode") String verifyCode) {
        boolean result = false;
        if (authorizeService.verifyEmailCode(email, verifyCode) && authorizeService.verifyEmail(email)) {
            result = authorizeService.resetPassword(email, password);
        }
        System.out.println(result);
        return RestBean.success(String.valueOf(result));
    }


}
