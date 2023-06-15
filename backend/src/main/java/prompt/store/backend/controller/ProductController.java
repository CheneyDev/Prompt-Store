package prompt.store.backend.controller;

import com.amazonaws.services.s3.AmazonS3;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.ProductModel;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.OrderService;
import prompt.store.backend.service.ProductModelService;
import prompt.store.backend.service.ProductPromptService;
import prompt.store.backend.utils.ObjectStorageUtil;
import prompt.store.backend.utils.ReplicateApi;
import prompt.store.backend.utils.ResultImageUtil;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ProductController {

    @Value("${cloudflare.r2.bucket}")
    public String bucketName;
    @Resource
    ProductPromptService productPromptService;
    @Resource
    ProductModelService productModelService;
    @Resource
    OrderService orderService;
    @Resource
    ObjectStorageUtil objectStorageUtil;
    @Resource
    ResultImageUtil resultImageUtil;
    @Resource
    ReplicateApi replicateApi;
    private ProductPrompt productPrompt;

    @GetMapping("/getPromptDetail")
    public RestBean<ProductPrompt> getPromptDetail(@RequestParam("sku") String sku) {
        ProductPrompt productPrompt = productPromptService.getProductPromptBySku(sku);
        return RestBean.success(productPrompt);
    }

    @GetMapping("/getPromptList")
    public RestBean<List<ProductPrompt>> getPromptList() {
        return RestBean.success(productPromptService.getPromptList());
    }

    @GetMapping("/getProductModels")
    public RestBean<List<ProductModel>> getProductModels() {
        return RestBean.success(productModelService.getProductModels());
    }

    @GetMapping("/getProductModelNamesBySku")
    public RestBean<List<ProductModel>> getProductModelNames(@RequestParam("sku") String sku) {
        return RestBean.success(productModelService.getProductModelNamesBySku(sku));
    }

    @GetMapping("/getSamplerByModelId")
    public RestBean<List<String>> getSamplerLeft(@RequestParam("modelId") String modelId) {
        return RestBean.success(productPromptService.getSamplerByModelId(modelId));
    }

    @GetMapping("/getSupportedResolutionsByModelID")
    public RestBean<List<String>> getSupportedResolutionsByModelID(@RequestParam("modelID") String modelID) {
        return RestBean.success(productModelService.getSupportedResolutionsByModelID(modelID));
    }

    @PostMapping("/generate")
    public RestBean<String> generate(@RequestBody Generate generateEntity) {
//        String base64Image = productPromptService.onGenerating(generateEntity);
//        File resultImage;
//        try {
//            resultImage = resultImageUtil.createTempFile(base64Image);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        String orderId=orderService.generateOrderId();
//        String resultImagePath=orderService.generateRsultImageNameAndPath(orderId);
//
//        orderService.generateOrder(orderId,resultImagePath,generateEntity);
//
//        AmazonS3 s3Client = objectStorageUtil.initS3Client();
//        objectStorageUtil.uploadFile(s3Client, bucketName, resultImagePath, resultImage);
//        resultImageUtil.deleteTempFile(resultImage);
//        Map<String, String> response = new HashMap<>();
//        response.put("orderId", orderId);
//        response.put("base64Image", base64Image);


        String base64Image = replicateApi.downloadAndConvertToBase64("https://replicate.delivery/pbxt/NrvTeMDDGWRJEajwc7el9NfjEBx2k7MUtwGje78f1lHvEtuIC/out-0.png");
        //休眠
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Map<String, String> response = new HashMap<>();
        response.put("orderId", "order1686823484071");
        response.put("base64Image", base64Image);


        return RestBean.success(response.toString());


    }
}
