package prompt.store.backend.service;

import prompt.store.backend.entity.ProductModel;

import java.util.List;

public interface ProductModelService {

    List<String> getProductModelNamesBySku(String sku);

    List<String>  getSupportedResolutionsLeftByModelID(String modelID, String defaultResolution);
    List<ProductModel> getProductModels();

}
