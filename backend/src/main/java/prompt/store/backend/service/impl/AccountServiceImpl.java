package prompt.store.backend.service.impl;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Account;
import prompt.store.backend.entity.order.Order;
import prompt.store.backend.mapper.AccountMapper;
import prompt.store.backend.service.AccountService;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Resource
    private AccountMapper accountMapper;

    @Value("${object_storage_url}")
    private String objectStorageUrl;

    @Override
    public int getAccountsTotalCount() {
        return accountMapper.getAccountsTotalCount();
    }


    @Override
    public void updateLoginTimestampByUsername(String username) {
        accountMapper.updateLoginTimestampByUsername(username);
    }

    @Override
    public void updateLastActivityTimestampByUsername(String username) {
        accountMapper.updateLastActivityTimestampByUsername(username);
    }

    @Override
    public void updateOnlineStatusByUsername(String username, String onlineStatus) {
        accountMapper.updateOnlineStatusByUsername(username, onlineStatus);
    }

    @Override
    public int getOnlineAccountsTotalCount() {
        return accountMapper.getOnlineAccountsTotalCount();
    }

    @Override
    public String getLoginTimestampByUsername(String username) {
        return accountMapper.getLoginTimestampByUsername(username);
    }

    @Override
    public String getLastActivityTimestampByUsername(String username) {
        return accountMapper.getLastActivityTimestampByUsername(username);
    }

    @Override
    public String getAvatarAndEmailByUsername(String username) {
        Account account = accountMapper.getAvatarPathAndEmailByUsername(username);
        account.setAvatarURL(objectStorageUrl);
        String userName= username;
        String email = account.getEmail();
        String avatarURL = account.getAvatarURL();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("username", userName);
        jsonObject.put("email", email);
        jsonObject.put("avatarURL", avatarURL);

        return jsonObject.toJSONString();
    }

    @Override
    public List<Account> getAllAccountsWithPagination(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<Account> accounts = accountMapper.getAllAccountsWithPagination(pageSize, offset);
        for (Account account : accounts) {
            account.setAvatarURL(objectStorageUrl);
        }
        return accounts;
    }

    @Override
    public void updateAccountById(int id, String username, String role, String email, String accountStatus) {
        accountMapper.updateAccountById(id, username, role, email, accountStatus);
    }

    @Override
    public void deleteAccountById(int id) {
        accountMapper.deleteAccountById(id);
    }
}
