package prompt.store.backend;

import com.amazonaws.services.s3.AmazonS3;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import prompt.store.backend.service.OrderService;
import prompt.store.backend.utils.ObjectStorageUtil;

import java.io.File;

@SpringBootTest
class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

    @Resource
    ObjectStorageUtil objectStorageUtil;

//    @Test
//    void testObjectStorage() {
//        File file = new File("./sku0001-main.jpg");
//        System.out.println(file.exists());
//        String currentDirectory = System.getProperty("user.dir");
//        System.out.println("Current Directory: " + currentDirectory);
//        AmazonS3 s3Client = objectStorageUtil.initS3Client();
//        objectStorageUtil.uploadFile(s3Client, "prompt-store-bucket", "sddjjjfdsfdfe-main.jpg", file);
//    }

    @Resource
    OrderService orderService;

    @Test
    void testGetOrderListByCustomerId() {
        System.out.println(orderService.getOrderListByUsername("admin"));
    }



}
