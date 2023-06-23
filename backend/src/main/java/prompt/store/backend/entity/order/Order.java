package prompt.store.backend.entity.order;

import lombok.Data;
import java.sql.Timestamp;

@Data
public class Order {

    private int id;
    private String orderId;
    private String customerName;
    private Timestamp orderDate;
    private String productName;
    private int quantity;
    private float unitPrice;
    private float totalPrice;
    private String orderPrompt;
    private String resultPath;

    private String resultURL;

    public void setResultURL(String objectStorageUrl) {
        this.resultURL = objectStorageUrl + this.resultPath;
    }
}
