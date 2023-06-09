package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.jmx.export.annotation.ManagedAttribute;
import prompt.store.backend.entity.ProductPrompt;

import java.util.List;

@Mapper
public interface ProductPromptMapper {

    @Select("SELECT * FROM product_prompt WHERE sku = #{sku}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "sku", column = "sku"),
            @Result(property = "productName", column = "product_name"),
            @Result(property = "coverImageUrl", column = "cover_image_url"),
            @Result(property = "description", column = "description"),
            @Result(property = "prompt", column = "prompt"),
            @Result(property = "negativePrompt", column = "negative_prompt"),
            @Result(property = "width", column = "width"),
            @Result(property = "height", column = "height"),
            @Result(property = "numOutputs", column = "num_outputs"),
            @Result(property = "steps", column = "steps"),
            @Result(property = "guidanceScale", column = "guidance_scale"),
            @Result(property = "seed", column = "seed"),
            @Result(property = "model", column = "model"),
            @Result(property = "modelId", column = "model_id"),
            @Result(property = "sampler", column = "sampler"),
            @Result(property = "maxSteps", column = "max_steps"),
            @Result(property = "maxScale", column = "max_scale"),
            @Result(property = "maxOutputs", column = "max_outputs")
    })
    ProductPrompt getProductPromptBySku(String sku);

    @Select("SELECT sampler\n" +
            "FROM sampler\n" +
            "WHERE sampler NOT IN (\n" +
            "    SELECT sampler\n" +
            "    FROM product_prompt\n" +
            "    WHERE sku = #{sku}\n" +
            ");\n")
    List<String> getSamplerLeftBySku(String sku);
}
