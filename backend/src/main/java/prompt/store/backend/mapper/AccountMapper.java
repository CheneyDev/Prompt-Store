package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.Mapper;
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
}
