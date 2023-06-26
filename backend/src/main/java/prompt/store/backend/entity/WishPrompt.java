package prompt.store.backend.entity;

import lombok.Data;

@Data
public class WishPrompt {
        private int id;
        private String wishId;
        private String customerId;
        private String mainImagePath;
        private String prompt;
        private String negativePrompt;
        private int width;
        private int height;
        private int numOutputs;
        private int steps;
        private float guidanceScale;
        private int seed;
        private String model;
        private int modelId;
        private ProductPrompt.Sampler sampler;

        private String mainImageURL;
        public enum Sampler {
            DDIM,
            K_EULER,
            DPMSolverMultistep,
            K_EULER_ANCESTRAL,
            PNDM,
            KLMS
        }

        public void setMainImageUrl(String objectStorageUrl) {
            this.mainImageURL = objectStorageUrl +"/"+ this.mainImagePath;
        }




}
