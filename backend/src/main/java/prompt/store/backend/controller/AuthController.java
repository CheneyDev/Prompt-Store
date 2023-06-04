package prompt.store.backend.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @RequestMapping("/isLogin")
    public RestBean isLogin() {
        return RestBean.success("true");
    }
}
