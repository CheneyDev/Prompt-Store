package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.*;
import prompt.store.backend.entity.Account;

import java.sql.Timestamp;
import java.util.List;

@Mapper
public interface AccountMapper {

    @Select("SELECT * FROM user_account WHERE username = #{usernameOrEmail} OR email = #{usernameOrEmail}")
    Account findAccountByUsernameOrEmail(String usernameOrEmail);

    @Select("SELECT * FROM user_account WHERE username = #{username}")
    Account findAccountByUsername(String username);

    @Select("SELECT * FROM user_account WHERE email = #{email}")
    Account findAccountByEmail(String email);

    //添加用户
    @Insert("INSERT INTO user_account (username, email, password,created_at) VALUES (#{username}, #{email}, #{password},#{timestamp})")
    void insertAccount(@Param("username") String username, @Param("email") String email, @Param("password") String password, @Param("timestamp") String timestamp);

    //添加用户 username, email, password, role, avatar_path,created_at
    @Insert("INSERT INTO user_account (username, email, password, role, avatar_path,created_at) VALUES (#{username}, #{email}, #{password}, #{role}, #{avatarPath},#{timestamp})")
    void insertAccountFromDashboard(@Param("username") String username, @Param("email") String email, @Param("password") String password, @Param("role") String role, @Param("avatarPath") String avatarPath, @Param("timestamp") Timestamp timestamp);


    @Insert("UPDATE user_account SET password = #{password} WHERE email = #{email}")
    void updatePasswordByEmail(@Param("email") String email, @Param("password") String password);

    @Select("SELECT COUNT(*) AS record_count FROM `user_account`;")
    int getAccountsTotalCount();

    @Update("UPDATE user_account SET login_timestamp = CURRENT_TIMESTAMP WHERE username = #{username};")
    void updateLoginTimestampByUsername(String username);

    @Update("UPDATE user_account SET last_activity_timestamp = CURRENT_TIMESTAMP WHERE username = #{username};")
    void updateLastActivityTimestampByUsername(String username);

    @Update("UPDATE `user_account` SET `online_status` = #{onlineStatus} WHERE `username` = #{username};")
    void updateOnlineStatusByUsername(@Param("username") String username, @Param("onlineStatus") String onlineStatus);

    @Select("SELECT COUNT(*) AS record_count FROM `user_account` WHERE `online_status` = 'online';")
    int getOnlineAccountsTotalCount();

    //获取login_timestamp
    @Select("SELECT login_timestamp FROM user_account WHERE username = #{username}")
    String getLoginTimestampByUsername(String username);

    @Select("SELECT last_activity_timestamp FROM user_account WHERE username = #{username}")
    String getLastActivityTimestampByUsername(String username);

    @Select("SELECT avatar_path,email FROM user_account WHERE username = #{username}")
    @Results({
            @Result(property = "avatarPath", column = "avatar_path"),
            @Result(property = "email", column = "email")
    })
    Account getAvatarPathAndEmailByUsername(String username);

    //分页查询所有用户
    @Select("SELECT id,username,role,email,account_status,avatar_path,last_activity_timestamp FROM user_account LIMIT #{pageSize} OFFSET #{offset}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "username", column = "username"),
            @Result(property = "role", column = "role"),
            @Result(property = "accountStatus", column = "account_status"),
            @Result(property = "avatarPath", column = "avatar_path"),
            @Result(property = "email", column = "email"),
            @Result(property = "lastActivityTimestamp", column = "last_activity_timestamp")
    })
    List<Account> getAllAccountsWithPagination(@Param("pageSize") int pageSize, @Param("offset") int offset);

    @Update("UPDATE user_account SET username = #{username},role = #{role},email = #{email},account_status = #{accountStatus} WHERE id = #{id}")
    void updateAccountById(@Param("id") int id, @Param("username") String username, @Param("role") String role, @Param("email") String email, @Param("accountStatus") String accountStatus);

    @Delete("DELETE FROM user_account WHERE id = #{id}")
    void deleteAccountById(int id);

    @Select("SELECT avatar_path FROM user_account WHERE id = #{id}")
    String getAvatarPathById(int id);
}
