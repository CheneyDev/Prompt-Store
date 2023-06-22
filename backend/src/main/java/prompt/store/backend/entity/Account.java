package prompt.store.backend.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Account {
    private int id;
    private String username;
    private String password;
    private String role;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDateTime createAt;
    private LocalDateTime createdAt;
    private String onlineStatus;
    private String accountStatus;
    private LocalDateTime loginTimestamp;
    private LocalDateTime lastActivityTimestamp;
}
