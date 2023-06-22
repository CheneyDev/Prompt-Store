package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import prompt.store.backend.mapper.AccountMapper;
import prompt.store.backend.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService {

    @Resource
    private AccountMapper accountMapper;
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
}
