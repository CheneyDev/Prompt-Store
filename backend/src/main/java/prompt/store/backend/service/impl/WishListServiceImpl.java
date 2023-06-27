package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.entity.WishPrompt;
import prompt.store.backend.mapper.WishListMapper;
import prompt.store.backend.service.WishListService;

import java.util.List;

@Service
public class WishListServiceImpl implements WishListService {

    @Resource
    private WishListMapper wishListMapper;

    @Value("${object_storage_url}")
    private String objectStorageUrl;
    @Override
    public List<WishPrompt> getWishListByUsername(String username) {
        List<WishPrompt> wishList = wishListMapper.getWishListByUsername(username);
        wishList.forEach(wishPrompt -> {
            wishPrompt.setMainImageUrl(objectStorageUrl);
        });
        return wishList;
    }

    @Override
    public List<WishPrompt> getWishListByUsernamePage(String username, int offset, int size) {
        List<WishPrompt> wishList=wishListMapper.getWishListByUsernamePage(username, offset, size);
        wishList.forEach(wishPrompt -> {
            wishPrompt.setMainImageUrl(objectStorageUrl);
        });
        return wishList;
    }

    @Override
    public int getWishListByUsernameCount(String username) {
        return wishListMapper.getWishListByUsernameCount(username);
    }

    @Override
    public void insertWishPrompt(WishPrompt wishPrompt) {
        wishListMapper.insertWishPrompt(wishPrompt);
    }

}
