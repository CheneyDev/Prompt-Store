package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.ProductModel;
import prompt.store.backend.mapper.ProductModelMapper;
import prompt.store.backend.service.ProductModelService;

import java.util.List;

@Service
public class ProductModelServiceImpl implements ProductModelService {

    @Resource
    private ProductModelMapper productModelMapper;

    @Override
    public List<String> getProductModelNamesBySku(String sku) {
        return productModelMapper.getProductModelNamesBySku(sku);
    }

    @Override
    public List<String> getSupportedResolutionsLeftByModelID(String modelID, String defaultResolution) {
        return productModelMapper.getSupportedResolutionsLeftByModelID(modelID, defaultResolution);
    }

    @Override
    public List<ProductModel> getProductModels() {
        return productModelMapper.getProductModels();
    }
}
