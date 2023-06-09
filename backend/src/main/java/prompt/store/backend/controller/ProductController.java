package prompt.store.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.ProductModelService;
import prompt.store.backend.service.ProductPromptService;

import java.util.List;

@RestController
public class ProductController {

    @Resource
    ProductPromptService productPromptService;
    @Resource
    ProductModelService productModelService;
    private ProductPrompt productPrompt;

    @GetMapping("/getProductPrompt")
    public RestBean<ProductPrompt> getProductPrompt(@RequestParam("sku") String sku) {
        ProductPrompt productPrompt = productPromptService.getProductPromptBySku(sku);
        return RestBean.success(productPrompt);
    }

    @GetMapping("/getProductModelNamesBySku")
    public RestBean<List<String>> getProductModelNames(@RequestParam("sku") String sku) {
        return RestBean.success(productModelService.getProductModelNamesBySku(sku));
    }

    @GetMapping("/getSamplerLeftBySku")
    public RestBean<List<String>> getSamplerLeft(@RequestParam("sku") String sku) {
        return RestBean.success(productPromptService.getSamplerLeftBySku(sku));
    }

    @GetMapping("/getSupportedResolutionsLeftByModelID")
    public RestBean<List<String>> getSupportedResolutionsLeftByModelID(@RequestParam("modelID") String modelID, @RequestParam("defaultResolution") String defaultResolution) {
        return RestBean.success(productModelService.getSupportedResolutionsLeftByModelID(modelID, defaultResolution));
    }
}
