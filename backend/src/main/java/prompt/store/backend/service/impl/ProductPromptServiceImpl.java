package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.mapper.ProductPromptMapper;
import prompt.store.backend.service.ProductPromptService;

import java.util.List;

@Service
public class ProductPromptServiceImpl implements ProductPromptService {

    @Resource
    ProductPromptMapper productPromptMapper;
    @Override
    public ProductPrompt getProductPromptBySku(String sku) {
        return productPromptMapper.getProductPromptBySku(sku);
    }

    @Override
    public List<String> getSamplerLeftBySku(String sku) {
        return productPromptMapper.getSamplerLeftBySku(sku);
    }
}
