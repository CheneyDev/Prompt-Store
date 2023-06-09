package prompt.store.backend.service;

import prompt.store.backend.entity.ProductPrompt;

import java.util.List;

public interface ProductPromptService {
    ProductPrompt getProductPromptBySku(String sku);

    List<String> getSamplerByModelId(String modelId);
}
