package prompt.store.backend.service;

import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.ProductPrompt;

import java.util.List;

public interface ProductPromptService {
    ProductPrompt getProductPromptBySku(String sku);

    List<ProductPrompt> getPromptList();

    List<ProductPrompt> getPromptListWithPagination(int offset, int size);

    List<String> getSamplerByModelId(String modelId);

    String onGenerating(Generate generateEntity);

    void deleteProductPromptBySku(String sku);

    void updateProductPromptBySku(ProductPrompt productPrompt);
}
