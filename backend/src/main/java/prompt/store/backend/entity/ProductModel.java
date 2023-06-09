package prompt.store.backend.entity;

import lombok.Data;

import java.util.List;

@Data
public class ProductModel {
    private int id;
    private String mainImagePath;
    private String modelName;
    private String modelDetailsUrl;
    private String modelApiId;
    private String defaultPrompt;
    private String defaultNegativePrompt;
    private String defaultResolution;
    private String supportedResolutions;
    private int defaultOutputs;
    private String supportedOutputs;
    private String defaultSampler;
    private String supportedSamplers;
    private int defaultSteps;
    private int maxSteps;
    private float defaultScale;
    private float maxScale;
    private int seed;

    private String mainImageURL;

    public void setMainImageURL(String objectStorageUrl) {
        this.mainImageURL = objectStorageUrl + this.mainImagePath;
    }
}
