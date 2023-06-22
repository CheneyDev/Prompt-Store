package prompt.store.backend.utils;

import jakarta.annotation.Resource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import prompt.store.backend.service.AccountService;

import java.sql.Timestamp;

@Component
public class ScheduleTask {

    @Resource
    AccountService accountService;

    //每5分钟获取last_activity_timestamp,计算用户是否大于5分钟未活动，大于则更新online_status为offline
    @Scheduled(cron = "0 0/5 * * * ?")
    public void updateOnlineStatus() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        Timestamp lastActivityTimestamp = Timestamp.valueOf(accountService.getLastActivityTimestampByUsername(userName));
        if (currentTimestamp.getTime() - lastActivityTimestamp.getTime() > 300000) {
            accountService.updateOnlineStatusByUsername(userName, "offline");
        }
    }
}
