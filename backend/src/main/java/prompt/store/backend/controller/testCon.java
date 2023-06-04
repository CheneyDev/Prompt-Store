package prompt.store.backend.controller;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;

@RestController
public class testCon {

    @RequestMapping("/test")
    public RestBean test() {
        return RestBean.success("test");
    }
}
