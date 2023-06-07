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
    public List<String> getProductModelNames() {
        return productModelMapper.getProductModelNames();
    }

    @Override
    public List<ProductModel> getProductModels() {
        return productModelMapper.getProductModels();
    }
}
