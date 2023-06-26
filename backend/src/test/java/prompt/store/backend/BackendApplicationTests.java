package prompt.store.backend;

import com.alibaba.fastjson2.JSONObject;
import com.amazonaws.services.s3.AmazonS3;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import prompt.store.backend.entity.order.Order;
import prompt.store.backend.entity.order.OrderAnalysis;
import prompt.store.backend.mapper.OrderMapper;
import prompt.store.backend.service.AccountService;
import prompt.store.backend.service.OrderService;
import prompt.store.backend.utils.ObjectStorageUtil;

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

    @Resource
    ObjectStorageUtil objectStorageUtil;

    @Value("${cloudflare.r2.bucket}")
    public String bucketName;

    @Test
    void Test5() {
//        List<Order> lists=orderService.getOrderListByUsernameWithPagination("admin",2,10);
//        System.out.println(lists);
        AmazonS3 s3 = objectStorageUtil.initS3Client();
        objectStorageUtil.deleteFile(s3, bucketName, "resources/SCR-20230625-ncoo.jpeg");
    }
}
