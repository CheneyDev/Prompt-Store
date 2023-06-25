package prompt.store.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import prompt.store.backend.entity.Account;
import prompt.store.backend.entity.AccountPostBody;
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
        return RestBean.success(String.valueOf(accountService.getAccountsTotalCount()));
    }

    @GetMapping("/getOnlineAccounts")
    public RestBean<String> getOnlineAccountsTotalCount() {
        updateLastActivityTimestamp();
        return RestBean.success(String.valueOf(accountService.getOnlineAccountsTotalCount()));
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

    @PostMapping("/insertAccountFromDashboard")
    public RestBean<String> insertAccountFromDashboard(@RequestBody AccountPostBody accountPostBody) {
        String username = accountPostBody.getNewUserName();
        String email = accountPostBody.getNewUserEmail();
        String password = accountPostBody.getNewUserPassword();
        String role = accountPostBody.getNewUserRole();
        String avatarData = accountPostBody.getAvatarData();
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        password = bCryptPasswordEncoder.encode(password);
        updateLastActivityTimestamp();
        accountService.insertAccountFromDashboard(username, email, password, role, avatarData);
        return RestBean.success("success");
    }
}
