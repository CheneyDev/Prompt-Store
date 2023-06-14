package prompt.store.backend.controller;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @RequestMapping("/isLogin")
    public RestBean isLogin() {
        //获取当前用户
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userName=user.getUsername();
        return RestBean.success(userName);
    }
}
