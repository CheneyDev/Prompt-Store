package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import prompt.store.backend.entity.ProductModel;

import java.util.List;

@Mapper
public interface ProductModelMapper {

    @Select("SELECT m.id,m.model_name\n" +
            "FROM product_models m\n" +
            "LEFT JOIN product_prompt p ON m.model_name = p.model AND p.sku = #{sku}\n" +
            "WHERE p.model IS NULL;")
    @Result(property = "modelName", column = "model_name")
    @Result(property = "id", column = "id")
    List<ProductModel> getProductModelNamesBySku(String sku);

    @Select("SELECT resolution\n" +
            "FROM supported_resolution\n" +
            "WHERE model_id = #{modelID};")
    List<String> getSupportedResolutionsByModelID(String modelID);

    @Select("SELECT * FROM product_models")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "mainImagePath", column = "main_image_path"),
            @Result(property = "modelName", column = "model_name"),
            @Result(property = "modelDetailsUrl", column = "model_details_url"),
            @Result(property = "modelApiId", column = "model_api_id"),
            @Result(property = "defaultPrompt", column = "default_prompt"),
            @Result(property = "defaultNegativePrompt", column = "default_negative_prompt"),
            @Result(property = "defaultResolution", column = "default_resolution"),
            @Result(property = "supportedResolutions", column = "supported_resolutions"),
            @Result(property = "defaultOutputs", column = "default_outputs"),
            @Result(property = "supportedOutputs", column = "supported_outputs"),
            @Result(property = "defaultSampler", column = "default_sampler"),
            @Result(property = "supportedSamplers", column = "supported_samplers"),
            @Result(property = "defaultSteps", column = "default_steps"),
            @Result(property = "maxSteps", column = "max_steps"),
            @Result(property = "defaultScale", column = "default_scale"),
            @Result(property = "maxScale", column = "max_scale"),
            @Result(property = "seed", column = "seed")
    })
    List<ProductModel> getProductModels();

    @Select("SELECT model_api_id FROM product_models WHERE model_name=#{modelName};")
    String getModelApiIdByModelName(String modelName);





}
