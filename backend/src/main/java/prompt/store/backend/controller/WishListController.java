package prompt.store.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.entity.WishPrompt;
import prompt.store.backend.service.AccountService;
import prompt.store.backend.service.WishListService;

import java.util.List;

@RestController
public class WishListController {

    @Resource
    private WishListService wishListService;

    @Resource
    private AccountService accountService;

    private void updateLastActivityTimestamp() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            accountService.updateLastActivityTimestampByUsername(userName);
            accountService.updateOnlineStatusByUsername(userName, "online");
        }
    }

    @GetMapping("/getWishListByUsername")
    public RestBean<List<WishPrompt>> getWishListByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            return RestBean.success(wishListService.getWishListByUsername(userName));
        }
        updateLastActivityTimestamp();
        return RestBean.failure(400);
    }

    @GetMapping("/getWishListByUsernameWithPagination")
    public RestBean<List<WishPrompt>> getWishListByUsernameWithPagination(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            int offset = (page - 1) * pageSize;
            return RestBean.success(wishListService.getWishListByUsernamePage(userName, offset, pageSize));
        }
        updateLastActivityTimestamp();
        return RestBean.failure(400);
    }

    @GetMapping("/getWishListCountByUsername")
    public RestBean<String> getWishListCountByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            return RestBean.success(String.valueOf(wishListService.getWishListByUsernameCount(userName)));
        }
        updateLastActivityTimestamp();
        return RestBean.failure(400);
    }
}
