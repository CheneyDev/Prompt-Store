package prompt.store.backend.utils;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;

@Component
public class ResultImageUtil {

    public File createTempFile(String base64Image) throws IOException {
        byte[] imageData = Base64.getDecoder().decode(base64Image);
        File tempFile = null;
        try {
            tempFile = File.createTempFile("temp", ".jpg");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        FileOutputStream fos = new FileOutputStream(tempFile);
        fos.write(imageData);
        fos.close();
        return tempFile;
    }

    public void deleteTempFile(File file) {

        if (file != null) {
            boolean delete = file.delete();
            if (!delete) {
                System.out.println("删除失败");
            }
        }
    }
}
