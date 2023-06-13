package prompt.store.backend.utils;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
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
import prompt.store.backend.entity.Generate;
import prompt.store.backend.service.ProductModelService;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;


@Component
public class ReplicateApi {
    @Value("${replicate.api.token}")
    private String replicateApiToken;

    @Resource
    ProductModelService productModelService;

    public String generateImage(Generate generate) {
        HttpClient httpClient = HttpClients.createDefault();
        String apiUrl = "https://api.replicate.com/v1/predictions";
        String jsonResponse = "";

        String prompt = URLDecoder.decode(generate.getPrompt(), StandardCharsets.UTF_8);
        String negativePrompt = URLDecoder.decode(generate.getNegativePrompt(), StandardCharsets.UTF_8);
        String model = URLDecoder.decode(generate.getModel(), StandardCharsets.UTF_8);
        String sampler = URLDecoder.decode(generate.getSampler(), StandardCharsets.UTF_8);
        String width = URLDecoder.decode(generate.getWidth(), StandardCharsets.UTF_8);
        String height = URLDecoder.decode(generate.getHeight(), StandardCharsets.UTF_8);
        String steps = URLDecoder.decode(generate.getSteps(), StandardCharsets.UTF_8);
        String guidanceScale = URLDecoder.decode(generate.getGuidanceScale(), StandardCharsets.UTF_8);
        String seed = URLDecoder.decode(generate.getSeed(), StandardCharsets.UTF_8);

        try {
            // 构建POST请求
            HttpPost httpPost = new HttpPost(apiUrl);
            httpPost.setHeader(HttpHeaders.AUTHORIZATION, "Token " + replicateApiToken);
            httpPost.setHeader(HttpHeaders.CONTENT_TYPE, "application/json");


            String version=productModelService.getModelApiIdByModelName(model);

            // 构建请求体
            StringBuilder requestBodyBuilder = new StringBuilder();
            requestBodyBuilder.append("{\"version\": \"").append(version).append("\", \"input\": {\"prompt\": \"").append(prompt).append("\"");

            if (negativePrompt != null && !negativePrompt.isEmpty() && !negativePrompt.equals("null")) {
                requestBodyBuilder.append(", \"negative_prompt\": \"").append(negativePrompt).append("\"");
            }
            if (sampler != null && !sampler.isEmpty() && !sampler.equals("null")) {
                requestBodyBuilder.append(", \"sampler\": \"").append(sampler).append("\"");
            }
            if (width != null && !width.isEmpty() && !width.equals("null")) {
                requestBodyBuilder.append(", \"width\": ").append(width);
            }
            if (height != null && !height.isEmpty() && !height.equals("null")) {
                requestBodyBuilder.append(", \"height\": ").append(height);
            }
            if (steps != null && !steps.isEmpty() && !steps.equals("null")) {
                requestBodyBuilder.append(", \"num_inference_steps\": ").append(steps);
            }
            if (guidanceScale != null && !guidanceScale.isEmpty() && !guidanceScale.equals("null")) {
                requestBodyBuilder.append(", \"guidance_scale\": ").append(guidanceScale);
            }
            if (seed != null && !seed.isEmpty() && !seed.equals("null")) {
                requestBodyBuilder.append(", \"seed\": ").append(seed);
            }

            requestBodyBuilder.append("}}");
            String requestBody = requestBodyBuilder.toString();
            httpPost.setEntity(new StringEntity(requestBody));

            // 发送请求
            HttpResponse response = httpClient.execute(httpPost);

            // 获取响应内容
            jsonResponse = EntityUtils.toString(response.getEntity());


            // 处理响应内容，可以根据需要进行解析
            // ...
            return jsonResponse;


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

    public String extractOutputImageUrl(String predictionStatus) {
        JSONObject jsonObject = JSONObject.parseObject(predictionStatus);
        JSONArray outputArray = jsonObject.getJSONArray("output");
        if (outputArray != null && outputArray.size() > 0) {
            return outputArray.getString(0);
        }
        return null;
    }

    public String downloadAndConvertToBase64(String imageUrl) {
        HttpClient httpClient = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(imageUrl);
        try {
            HttpResponse response = httpClient.execute(httpGet);
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                // 下载图片
                byte[] imageBytes = IOUtils.toByteArray(entity.getContent());

                // 将图片转换为Base64字符串
                return Base64.encodeBase64String(imageBytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
