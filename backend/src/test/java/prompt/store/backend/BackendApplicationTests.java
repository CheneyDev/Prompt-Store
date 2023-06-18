package prompt.store.backend;

import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import prompt.store.backend.service.AuthorizeService;
import prompt.store.backend.utils.ResendApiUtil;

import java.io.IOException;
import java.net.URISyntaxException;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

//    @Resource
//    ObjectStorageUtil objectStorageUtil;

//    @Test
//    void testObjectStorage() {
//        File file = new File("./sku0001-main.jpg");
//        System.out.println(file.exists());
//        String currentDirectory = System.getProperty("user.dir");
//        System.out.println("Current Directory: " + currentDirectory);
//        AmazonS3 s3Client = objectStorageUtil.initS3Client();
//        objectStorageUtil.uploadFile(s3Client, "prompt-store-bucket", "sddjjjfdsfdfe-main.jpg", file);
//    }

//    @Resource
//    OrderService orderService;
//
//    @Test
//    void testGetOrderListByCustomerId() {
//        System.out.println(orderService.getOrderListByUsername("admin"));
//    }
//


    //测试 AuthorizedService sendVerifyEmail
}
