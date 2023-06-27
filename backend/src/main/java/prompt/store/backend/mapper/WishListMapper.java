package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.*;
import prompt.store.backend.entity.WishPrompt;

import java.util.List;

@Mapper
public interface WishListMapper {

    //根据 用户名 查找记录
    @Select("SELECT * FROM wishlist_prompt WHERE customer_name=#{username};")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "wishId", column = "wish_id"),
            @Result(property = "customerId", column = "customer_name"),
            @Result(property = "mainImagePath", column = "main_image_path"),
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
            @Result(property = "sampler", column = "sampler")
    })
    List<WishPrompt> getWishListByUsername(String username);

    //根据 用户名 分页查找记录
    @Select("SELECT * FROM wishlist_prompt WHERE customer_name=#{username} LIMIT #{offset},#{size};")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "wishId", column = "wish_id"),
            @Result(property = "customerId", column = "customer_name"),
            @Result(property = "mainImagePath", column = "main_image_path"),
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
            @Result(property = "sampler", column = "sampler")
    })
    List<WishPrompt> getWishListByUsernamePage(String username, int offset, int size);

    //根据 用户名 查找记录数
    @Select("SELECT COUNT(*) FROM wishlist_prompt WHERE customer_name=#{username};")
    int getWishListByUsernameCount(String username);

    @Insert("INSERT INTO wishlist_prompt(customer_name,prompt,negative_prompt,width,height,steps,guidance_scale,seed,model,sampler) VALUES(#{customerId},#{prompt},#{negativePrompt},#{width},#{height},#{steps},#{guidanceScale},#{seed},#{model},#{sampler});")
    void insertWishPrompt(WishPrompt wishPrompt);

    //根据 id 删除记录
    @Delete("DELETE FROM wishlist_prompt WHERE id=#{id};")
    void deleteWishPromptById(int id);

}
