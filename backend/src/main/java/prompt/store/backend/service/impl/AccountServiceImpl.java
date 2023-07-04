package prompt.store.backend.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.amazonaws.services.s3.AmazonS3;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Account;
import prompt.store.backend.mapper.AccountMapper;
import prompt.store.backend.service.AccountService;
import prompt.store.backend.utils.ObjectStorageUtil;
import prompt.store.backend.utils.ResultImageUtil;

import java.io.File;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Resource
    private ObjectStorageUtil objectStorageUtil;

    @Resource
    private ResultImageUtil resultImageUtil;

    @Resource
    private AccountMapper accountMapper;

    @Value("${object_storage_url}")
    private String objectStorageUrl;

    @Value("${cloudflare.r2.bucket}")
    public String bucketName;


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

    @Override
    public List<Account> getAllAccountsWithPagination(int page, int pageSize) {
        int offset = (page - 1) * pageSize;
        List<Account> accounts = accountMapper.getAllAccountsWithPagination(pageSize, offset);
        for (Account account : accounts) {
            account.setAvatarURL(objectStorageUrl);
        }
        return accounts;
    }

    @Override
    public void updateAccountById(int id, String username, String role, String email, String accountStatus) {
        accountMapper.updateAccountById(id, username, role, email, accountStatus);
    }

    @Override
    public void deleteAccountById(int id) {
        AmazonS3 s3Client = objectStorageUtil.initS3Client();
        String avatarPath = accountMapper.getAvatarPathById(id);
        avatarPath = avatarPath.substring(1);
        objectStorageUtil.deleteFile(s3Client, bucketName, avatarPath);

        accountMapper.deleteAccountById(id);

    }

    @Override
    public void insertAccountFromDashboard(String username, String email, String password, String role, String avatarData) {
        Timestamp timestamp = new Timestamp(new Date().getTime());
        String avatarPath = "resources/avatar/" + username + ".png";
        //去掉前缀
        avatarData = avatarData.substring(avatarData.indexOf(",") + 1);
        File avatarFile;
        try {
            avatarFile = resultImageUtil.createTempFile(avatarData);
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }
        //上传到对象存储
        AmazonS3 s3Client = objectStorageUtil.initS3Client();
        objectStorageUtil.uploadFile(s3Client, bucketName, avatarPath, avatarFile);
        resultImageUtil.deleteTempFile(avatarFile);

        accountMapper.insertAccountFromDashboard(username, email, password, role, "/"+avatarPath, timestamp);
    }

    @Override
    public Account getAccountByUsername(String username) {
        Account account = accountMapper.findAccountByUsername(username);
        account.setAvatarURL(objectStorageUrl);
        return account;

    }
}
