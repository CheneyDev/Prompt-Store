package prompt.store.backend.service;

import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.ProductPrompt;

import java.util.List;

public interface ProductPromptService {
    ProductPrompt getProductPromptBySku(String sku);

    List<ProductPrompt> getPromptList();

    List<String> getSamplerByModelId(String modelId);

    String onGenerating(Generate generateEntity);
}
