package prompt.store.backend.service;

import prompt.store.backend.entity.ProductPrompt;

public interface ProductPromptService {
    ProductPrompt getProductPromptBySku(String sku);
}
