package prompt.store.backend.entity.order;

import lombok.Data;

@Data
public class OrderAnalysis {

    private String year;
    private String month;
    private float totalPrice;
}
