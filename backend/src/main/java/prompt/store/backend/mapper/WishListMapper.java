package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import prompt.store.backend.entity.WishPrompt;

import java.util.List;

@Mapper
public interface WishListMapper {

    //根据 用户名 查找记录
    @Select("SELECT * FROM wishlist_prompt WHERE customer_name=#{username};")
    List<WishPrompt> getWishListByUsername(String username);

    //根据 用户名 分页查找记录
    @Select("SELECT * FROM wishlist_prompt WHERE customer_name=#{username} LIMIT #{offset},#{size};")
    List<WishPrompt> getWishListByUsernamePage(String username, int offset, int size);

    //根据 用户名 查找记录数
    @Select("SELECT COUNT(*) FROM wishlist_prompt WHERE customer_name=#{username};")
    int getWishListByUsernameCount(String username);
}
