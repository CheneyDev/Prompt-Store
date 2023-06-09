package prompt.store.backend.service;

import prompt.store.backend.entity.ProductModel;

import java.util.List;

public interface ProductModelService {

    List<ProductModel> getProductModelNamesBySku(String sku);

    List<String>  getSupportedResolutionsByModelID(String modelID);
    List<ProductModel> getProductModels();

}
