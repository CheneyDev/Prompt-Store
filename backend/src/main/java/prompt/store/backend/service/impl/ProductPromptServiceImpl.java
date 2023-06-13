package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.mapper.ProductPromptMapper;
import prompt.store.backend.service.ProductPromptService;

import java.util.List;

@Service
public class ProductPromptServiceImpl implements ProductPromptService {


    @Value("${object_storage_url}")
    private String objectStorageUrl;

    @Resource
    ProductPromptMapper productPromptMapper;
    @Override
    public ProductPrompt getProductPromptBySku(String sku) {
        ProductPrompt productPrompt = productPromptMapper.getProductPromptBySku(sku);
        productPrompt.setMainImageUrl(objectStorageUrl);
        System.out.println(productPrompt.getMainImageURL());
        return productPrompt;
    }

    @Override
    public List<ProductPrompt> getPromptList() {
        List<ProductPrompt> promptList = productPromptMapper.getPromptList();
        for (ProductPrompt productPrompt : promptList) {
            productPrompt.setMainImageUrl(objectStorageUrl);
        }
        return promptList;
    }

    @Override
    public List<String> getSamplerByModelId(String modelId) {
        return productPromptMapper.getSamplerByModelId(modelId);
    }
}
