package prompt.store.backend;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.apache.http.entity.StringEntity;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.service.ProductModelService;
import prompt.store.backend.service.ProductPromptService;
import prompt.store.backend.utils.ReplicateApi;

@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void test() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		System.out.println(encoder.encode("@123456"));
	}



	@Resource
	ReplicateApi replicateApi;
	@Test
	void test6() {
//		String res= replicateApi.generateImage("monkey");
//		JSONObject jsonObject = JSONObject.parseObject(res);
//		String id=jsonObject.getString("id");
		System.out.println(replicateApi.getPredictionStatus("uswymqbbvmddccz5rtejj4crge"));
	}

	@Test
	void test7() {
		String prompt="dsds";
		String requestBody = "{\"version\": \"1f7f51e8b2e43ade14fb7d6d62385854477e078ac870778aafecf70c0a6de006\", \"input\": {\"prompt\": \"" + prompt + "\"}}";
		System.out.println(requestBody);
	}

}
