package prompt.store.backend.utils;

import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class ReplicateApi {
    @Value("${replicate.api.token}")
    private String replicateApiToken;

    public String generateImage(String prompt) {
        HttpClient httpClient = HttpClients.createDefault();
        String apiUrl = "https://api.replicate.com/v1/predictions";
        String jsonResponse = "";

        try {
            // 构建POST请求
            HttpPost httpPost = new HttpPost(apiUrl);
            httpPost.setHeader(HttpHeaders.AUTHORIZATION, "Token " + replicateApiToken);
            httpPost.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");

            // 构建请求体
            String requestBody = "{\"version\": \"1f7f51e8b2e43ade14fb7d6d62385854477e078ac870778aafecf70c0a6de006\", \"input\": {\"prompt\": \"" + prompt + "\"}}";
            httpPost.setEntity(new StringEntity(requestBody));

            // 发送请求
            HttpResponse response = httpClient.execute(httpPost);

            // 获取响应内容
            jsonResponse = EntityUtils.toString(response.getEntity());

            // 处理响应内容，可以根据需要进行解析
            // ...

        } catch (Exception e) {
            e.printStackTrace();
        }

        return jsonResponse;

    }

    public String getPredictionStatus(String predictionId) {
        HttpClient httpClient = HttpClients.createDefault();
        String apiUrl = "https://api.replicate.com/v1/predictions/" + predictionId;
        String jsonResponse = "";

        try {
            // 构建GET请求
            HttpGet httpGet = new HttpGet(apiUrl);
            httpGet.setHeader(HttpHeaders.AUTHORIZATION, "Token " + replicateApiToken);
            httpGet.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");

            // 发送请求
            HttpResponse response = httpClient.execute(httpGet);

            // 获取响应内容
            jsonResponse = EntityUtils.toString(response.getEntity());

            // 处理响应内容，可以根据需要进行解析
            // ...

        } catch (Exception e) {
            e.printStackTrace();
        }

        return jsonResponse;
    }
}
