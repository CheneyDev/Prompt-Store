package prompt.store.backend.service;

import org.springframework.stereotype.Service;

public interface AccountService {

    int getAccountsTotalCount();

    void updateLoginTimestampByUsername(String username);

    void updateLastActivityTimestampByUsername(String username);

    void updateOnlineStatusByUsername(String username, String onlineStatus);

    int getOnlineAccountsTotalCount();

    String getLoginTimestampByUsername(String username);

    String getLastActivityTimestampByUsername(String username);
}
