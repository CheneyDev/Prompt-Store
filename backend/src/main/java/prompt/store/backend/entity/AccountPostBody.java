package prompt.store.backend.entity;

import lombok.Data;

@Data
public class AccountPostBody {
    private String newUserName;
    private String newUserEmail;
    private String newUserRole;
    private String newUserPassword;
    private String avatarData;
}
