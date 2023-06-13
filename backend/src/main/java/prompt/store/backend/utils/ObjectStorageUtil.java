package prompt.store.backend.utils;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class ObjectStorageUtil {

    @Value("${cloudflare.r2.access.id}")
    public String accessId;
    @Value("${cloudflare_r2_access_key}")
    public String secretKey;

    public AmazonS3 initS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(accessId, secretKey);
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(new AwsClientBuilder.EndpointConfiguration("https://7b3e05193016570b634981851d9bf159.r2.cloudflarestorage.com/", "us-east-1"))
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
        return s3Client;
    }

    public void uploadFile(AmazonS3 s3Client,String bucketName, String fileName, File file) {
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, file).withCannedAcl(CannedAccessControlList.PublicRead));
    }







}

