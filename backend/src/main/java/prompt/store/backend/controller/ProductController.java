package prompt.store.backend.controller;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.ProductModel;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.ProductModelService;
import prompt.store.backend.service.ProductPromptService;
import prompt.store.backend.utils.ReplicateApi;

import java.util.List;

@RestController
public class ProductController {

    @Resource
    ProductPromptService productPromptService;
    @Resource
    ProductModelService productModelService;

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
        System.out.println(generateEntity);
        String predictionResponse = replicateApi.generateImage(generateEntity);
        String predictionId= JSONObject.parseObject(predictionResponse).getString("id");
        System.out.println(predictionId);
        String predictionStatus;
        do {
            predictionStatus = replicateApi.getPredictionStatus(predictionId);
            System.out.println(predictionStatus);
            // 延时一段时间再次查询
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } while (!predictionStatus.contains("\"status\":\"succeeded\""));
        String outputImageUrl = replicateApi.extractOutputImageUrl(predictionStatus);
        String base64Image = replicateApi.downloadAndConvertToBase64(outputImageUrl);
//        String base64Image = replicateApi.downloadAndConvertToBase64("https://replicate.delivery/pbxt/XAYedy6WKDWkACx2zELnePY1rDEoXLq1zVtBpg6EW8JqlNFRA/out-0.png");
//        //休眠5秒
//        try {
//            Thread.sleep(5000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        return RestBean.success(base64Image);


    }
}
