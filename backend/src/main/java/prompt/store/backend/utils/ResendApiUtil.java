package prompt.store.backend.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Component
public class ResendApiUtil {
    @Value("${resend.api.key}")
    private  String resendApiKey;
    @Value("${resend.api.url}")
    private  String resendApiUrl;

    public void sendEmail(String from, String to, String subject, String text) throws InterruptedException, IOException, URISyntaxException {

        HttpClient client = HttpClient.newHttpClient();

        // Create request body
        String requestBody = "{ \"from\": \"" + from + "\", \"to\": \"" + to +
                "\", \"subject\": \"" + subject + "\", \"text\": \"" + text + "\"" +
                " }";

        // Create HTTP request
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI(resendApiUrl))
                .header("Authorization", "Bearer " + resendApiKey)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        // Send the request and receive the response
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        // Process the response
        int statusCode = response.statusCode();
        String responseBody = response.body();
        HttpHeaders headers = response.headers();

        // Print the response
        System.out.println("Status code: " + statusCode);
        System.out.println("Response body: " + responseBody);
        System.out.println("Response headers: " + headers.map());
    }
}
