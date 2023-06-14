package prompt.store.backend.entity;

import lombok.Data;

import java.util.Date;

@Data
public class Order {

    private int id;
    private String orderId;
    private String customerName;
    private Date orderDate;
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
