package prompt.store.backend.entity;

import lombok.Data;

@Data
public class ProductPrompt {
    private int productId;
    private String sku;
    private String productName;
    private String coverImageUrl;
    private String description;
    private String prompt;
    private String negativePrompt;
    private PixelDimensions pixelDimensions;
    private int numOutputs;
    private int steps;
    private float guidanceScale;
    private int seed;
    private String model;
    private Sampler sampler;
    private int maxSteps;
    private float maxScale;
    private int maxOutputs;

    public enum PixelDimensions {
        DIM_512,
        DIM_768
    }

    public enum Sampler {
        DDIM,
        K_EULER,
        DPMSolverMultistep,
        K_EULER_ANCESTRAL,
        PNDM,
        KLMS
    }

}
