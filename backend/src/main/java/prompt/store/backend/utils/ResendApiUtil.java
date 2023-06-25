package prompt.store.backend.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class ResendApiUtil {
    @Value("${resend.api.key}")
    private String resendApiKey;
    @Value("${resend.api.url}")
    private String resendApiUrl;

    public void sendEmail(String from, String to, String subject, String text) throws InterruptedException, IOException, URISyntaxException {

        HttpClient client = HttpClient.newHttpClient();

        String requestBody = "{ \"from\": \"" + from + "\", \"to\": \"" + to +
                "\", \"subject\": \"" + subject + "\", \"text\": \"" + text + "\"" +
                " }";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(resendApiUrl))
                .header("Authorization", "Bearer " + resendApiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
    }
}
