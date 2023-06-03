package prompt.store.backend.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.AuthorizeService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    public AuthController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public RestBean<Object> login(@RequestBody String body) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            JSONObject.parseObject(body).getString("username"),
                            JSONObject.parseObject(body).getString("password")
                    )
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            AuthorizeService authorizeService = (AuthorizeService) authentication.getPrincipal();
            return RestBean.success();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return RestBean.failure(401, "登录失败！");
        }


    }
}
