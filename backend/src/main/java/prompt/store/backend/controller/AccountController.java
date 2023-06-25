package prompt.store.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.Account;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.AccountService;

import java.util.List;

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
        updateLastActivityTimestamp();
        return  RestBean.success(String.valueOf(accountService.getOnlineAccountsTotalCount()));
    }

    @GetMapping("/getAvatarAndEmailByUsername")
    public RestBean<String> getAvatarAndEmailByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            return RestBean.success(accountService.getAvatarAndEmailByUsername(userName));
        }
        updateLastActivityTimestamp();
        return RestBean.failure(400);
    }

    @GetMapping("/getAllAccountsWithPagination")
    public RestBean<List<Account>> getAllAccountsWithPagination(@RequestParam("page") int page, @RequestParam("pageSize") int pageSize) {
        updateLastActivityTimestamp();
        return RestBean.success(accountService.getAllAccountsWithPagination(page, pageSize));
    }

    @PostMapping("/updateAccountById")
    public RestBean<String> updateAccountById(@RequestParam("id") int id, @RequestParam("username") String username, @RequestParam("role") String role, @RequestParam("email") String email, @RequestParam("accountStatus") String accountStatus) {
        updateLastActivityTimestamp();
        accountService.updateAccountById(id, username, role, email, accountStatus);
        return RestBean.success("success");
    }

    @PostMapping("/deleteAccountById")
    public RestBean<String> deleteAccountById(@RequestParam("id") int id) {
        updateLastActivityTimestamp();
        accountService.deleteAccountById(id);
        return RestBean.success("success");
    }
}
