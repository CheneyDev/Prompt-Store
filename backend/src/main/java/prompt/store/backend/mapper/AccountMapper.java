package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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
}
