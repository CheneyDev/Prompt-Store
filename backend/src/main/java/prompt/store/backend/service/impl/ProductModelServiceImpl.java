package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.ProductModel;
import prompt.store.backend.mapper.ProductModelMapper;
import prompt.store.backend.service.ProductModelService;

import java.util.List;

@Service
public class ProductModelServiceImpl implements ProductModelService {
    @Value("${object_storage_url}")
    private String objectStorageUrl;
    @Resource
    private ProductModelMapper productModelMapper;

    @Override
    public List<ProductModel> getProductModelNamesBySku(String sku) {
        return productModelMapper.getProductModelNamesBySku(sku);
    }

    @Override
    public List<String> getSupportedResolutionsByModelID(String modelID) {
        return productModelMapper.getSupportedResolutionsByModelID(modelID);
    }

    @Override
    public List<ProductModel> getProductModels() {
        List<ProductModel> productModelList = productModelMapper.getProductModels();
        for (ProductModel productModel : productModelList) {
            productModel.setMainImageURL(objectStorageUrl);
        }
        return productModelList;



    }

    @Override
    public String getModelApiIdByModelName(String modelName) {
        return productModelMapper.getModelApiIdByModelName(modelName);
    }
}
