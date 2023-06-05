package prompt.store.backend;

import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.service.ProductPromptService;

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
	ProductPromptService productPromptService;
	@Test
	void test2() {
		ProductPrompt productPrompt =productPromptService.getProductPromptBySku("#0001");
		System.out.println(productPrompt.getProductName());
		System.out.println(productPrompt.getCoverImageUrl());
		System.out.println(productPrompt.getPrompt());
		System.out.println(productPrompt.toString());
	}

}
