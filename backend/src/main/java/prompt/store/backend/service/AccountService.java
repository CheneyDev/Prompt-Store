package prompt.store.backend.service;

import prompt.store.backend.entity.Account;

import java.util.List;

public interface AccountService {

    int getAccountsTotalCount();

    void updateLoginTimestampByUsername(String username);

    void updateLastActivityTimestampByUsername(String username);

    void updateOnlineStatusByUsername(String username, String onlineStatus);

    int getOnlineAccountsTotalCount();

    String getLoginTimestampByUsername(String username);

    String getLastActivityTimestampByUsername(String username);

    String getAvatarAndEmailByUsername(String username);

    List<Account> getAllAccountsWithPagination(int page, int offset);

    void updateAccountById(int id, String username, String role, String email, String accountStatus);

    void deleteAccountById(int id);
}
