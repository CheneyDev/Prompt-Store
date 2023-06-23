package prompt.store.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.AccountService;

@RestController
public class AccountController {
    @Resource
    AccountService accountService;

    private void updateLastActivityTimestamp() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            accountService.updateLastActivityTimestampByUsername(userName);
            accountService.updateOnlineStatusByUsername(userName, "online");
        }
    }

    @GetMapping("/getAccountsTotalCount")
    public RestBean<String> getAccountsTotalCount() {
        updateLastActivityTimestamp();
        return  RestBean.success(String.valueOf(accountService.getAccountsTotalCount()));
    }

    @GetMapping("/getOnlineAccounts")
    public RestBean<String> getOnlineAccountsTotalCount() {
        return  RestBean.success(String.valueOf(accountService.getOnlineAccountsTotalCount()));
    }

    @GetMapping("/getAvatarAndEmailByUsername")
    public RestBean<String> getAvatarAndEmailByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            return RestBean.success(accountService.getAvatarAndEmailByUsername(userName));
        }
        return RestBean.failure(400);
    }
}
