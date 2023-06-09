package prompt.store.backend.entity;

import lombok.Data;

@Data
public class Generate {
    private String prompt;
    private String negativePrompt;
    private String model;
    private String sampler;
    private String width;
    private String height;
    private String steps;
    private String guidanceScale;
    private String seed;
    private String numOutputs;


}
