package prompt.store.backend.service;

import prompt.store.backend.entity.WishPrompt;

import java.util.List;

public interface WishListService {
    List<WishPrompt> getWishListByUsername(String username);

    //根据 用户名 分页查找记录
    List<WishPrompt> getWishListByUsernamePage(String username, int offset, int size);

    //根据 用户名 查找记录数
    int getWishListByUsernameCount(String username);

    void insertWishPrompt(WishPrompt wishPrompt);

    void deleteWishPromptById(int id);
}
