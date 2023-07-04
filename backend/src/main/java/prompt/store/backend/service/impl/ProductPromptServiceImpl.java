package prompt.store.backend.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.amazonaws.services.s3.AmazonS3;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.mapper.ProductPromptMapper;
import prompt.store.backend.service.ProductPromptService;
import prompt.store.backend.utils.ObjectStorageUtil;
import prompt.store.backend.utils.ReplicateApi;
import prompt.store.backend.utils.ResultImageUtil;

import java.io.File;
import java.util.List;

@Service
public class ProductPromptServiceImpl implements ProductPromptService {


    @Value("${object_storage_url}")
    private String objectStorageUrl;

    @Value("${cloudflare.r2.bucket}")
    public String bucketName;

    @Resource
    ReplicateApi replicateApi;

    @Resource
    ResultImageUtil resultImageUtil;

    @Resource
    ObjectStorageUtil objectStorageUtil;
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

        AmazonS3 s3Client = objectStorageUtil.initS3Client();
        String imagePath = productPromptMapper.getProductPromptBySku(sku).getMainImagePath();
        imagePath = imagePath.substring(1);
        objectStorageUtil.deleteFile(s3Client, bucketName, imagePath);

        productPromptMapper.deleteProductPromptBySku(sku);
    }

    @Override
    public void updateProductPromptBySku(ProductPrompt productPrompt) {
        productPromptMapper.updateProductPromptBySku(productPrompt);
    }

    @Override
    public void insertProductPrompt(ProductPrompt productPrompt) {
        String imageData = productPrompt.getMainImagePath();
        String uploadPath = "resources/prompt-images/" + productPrompt.getSku() + "/" + productPrompt.getSku() + "-main.jpg";
        imageData = imageData.substring(imageData.indexOf(",") + 1);
        File imageFile;
        try {
            imageFile = resultImageUtil.createTempFile(imageData);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        AmazonS3 s3Client = objectStorageUtil.initS3Client();
        objectStorageUtil.uploadFile(s3Client, bucketName, uploadPath, imageFile);
        productPrompt.setMainImagePath("/" + uploadPath);
        resultImageUtil.deleteTempFile(imageFile);
        productPromptMapper.insertProductPrompt(productPrompt);
    }

    @Override
    public int getTotalPromptCount() {
        return productPromptMapper.getTotalPromptCount();
    }


}
