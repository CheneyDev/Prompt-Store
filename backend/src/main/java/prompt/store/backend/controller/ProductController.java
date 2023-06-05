package prompt.store.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.ProductPromptService;

@RestController
public class ProductController {

    @Resource
    ProductPromptService productPromptService;
    private ProductPrompt productPrompt;

    @GetMapping("/getProductPrompt")
    public RestBean<ProductPrompt> getProductPrompt(@RequestParam("sku") String sku) {
        ProductPrompt productPrompt = productPromptService.getProductPromptBySku(sku);
        return RestBean.success(productPrompt);
    }
}
