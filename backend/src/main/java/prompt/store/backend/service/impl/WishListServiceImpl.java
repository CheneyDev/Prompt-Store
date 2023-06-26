package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.WishPrompt;
import prompt.store.backend.mapper.WishListMapper;
import prompt.store.backend.service.WishListService;

import java.util.List;

@Service
public class WishListServiceImpl implements WishListService {

    @Resource
    private WishListMapper wishListMapper;
    @Override
    public List<WishPrompt> getWishListByUsername(String username) {
        return wishListMapper.getWishListByUsername(username);
    }

    @Override
    public List<WishPrompt> getWishListByUsernamePage(String username, int offset, int size) {
        return wishListMapper.getWishListByUsernamePage(username, offset, size);
    }

    @Override
    public int getWishListByUsernameCount(String username) {
        return wishListMapper.getWishListByUsernameCount(username);
    }
}
