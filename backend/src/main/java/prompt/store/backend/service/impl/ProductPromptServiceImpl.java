package prompt.store.backend.service.impl;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.mapper.ProductPromptMapper;
import prompt.store.backend.service.ProductPromptService;
import prompt.store.backend.utils.ReplicateApi;

import java.util.List;

@Service
public class ProductPromptServiceImpl implements ProductPromptService {


    @Value("${object_storage_url}")
    private String objectStorageUrl;
@Resource
    ReplicateApi replicateApi;
    @Resource
    ProductPromptMapper productPromptMapper;
    @Override
    public ProductPrompt getProductPromptBySku(String sku) {
        ProductPrompt productPrompt = productPromptMapper.getProductPromptBySku(sku);
        if (productPrompt == null) {
            return null;
        }
        productPrompt.setMainImageUrl(objectStorageUrl);
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
    public List<ProductPrompt> getPromptListWithPagination(int offset, int size) {
        List<ProductPrompt> promptList = productPromptMapper.getPromptListWithPagination(offset, size);
        for (ProductPrompt productPrompt : promptList) {
            productPrompt.setMainImageUrl(objectStorageUrl);
        }
        return promptList;
    }

    @Override
    public List<String> getSamplerByModelId(String modelId) {
        return productPromptMapper.getSamplerByModelId(modelId);
    }

    @Override
    public String onGenerating(Generate generateEntity) {
        String predictionResponse = replicateApi.generateImage(generateEntity);
        String predictionId = JSONObject.parseObject(predictionResponse).getString("id");
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
        return replicateApi.downloadAndConvertToBase64(outputImageUrl);
    }

    @Override
    public void deleteProductPromptBySku(String sku) {
        productPromptMapper.deleteProductPromptBySku(sku);
    }


}
