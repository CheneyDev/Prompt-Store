package prompt.store.backend;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import prompt.store.backend.entity.order.OrderAnalysis;
import prompt.store.backend.mapper.OrderMapper;
import prompt.store.backend.service.AccountService;
import prompt.store.backend.service.OrderService;

import java.sql.Timestamp;
import java.util.List;

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
    @Resource
    OrderMapper orderMapper;

    @Test
    void Test5() {
        System.out.println(orderService.getTopFiveOrders());
    }
}
