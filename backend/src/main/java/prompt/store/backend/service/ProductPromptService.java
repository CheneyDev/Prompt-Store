package prompt.store.backend.service;

import org.springframework.stereotype.Service;
import prompt.store.backend.entity.ProductPrompt;

public interface ProductPromptService {
    ProductPrompt getProductPromptBySku(String sku);
}
