package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.*;
import prompt.store.backend.entity.Account;

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

}
