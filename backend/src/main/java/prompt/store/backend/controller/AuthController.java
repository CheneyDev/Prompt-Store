package prompt.store.backend.controller;


import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
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
    public RestBean<String> getVerifyCode(HttpServletResponse response) {
        //获取当前用户
//        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String userName=user.getUsername();

        return RestBean.success("true");
    }

    @PostMapping("/verifyUsername")
    public RestBean<String> verifyUsername(@RequestParam("username") String username) {

        boolean result = authorizeService.verifyUsername(username);
        System.out.println(result);
        if (result) {
            return RestBean.success("true");
        } else {
            return RestBean.success("false");
        }
    }

}
