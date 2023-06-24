package prompt.store.backend.service.impl;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Account;
import prompt.store.backend.mapper.AccountMapper;
import prompt.store.backend.service.AccountService;

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
}
