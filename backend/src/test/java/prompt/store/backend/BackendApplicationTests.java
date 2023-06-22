package prompt.store.backend;

import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import prompt.store.backend.service.AccountService;
import prompt.store.backend.service.OrderService;

import java.sql.Timestamp;

@SpringBootTest
class BackendApplicationTests {

    //密码加密
    @Test
    void contextLoads() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    }


    @Resource
    OrderService orderService;
    @Resource
    AccountService accountService;

    @Test
    void Test5() {

    }
}
