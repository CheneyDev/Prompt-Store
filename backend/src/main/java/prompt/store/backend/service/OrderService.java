package prompt.store.backend.service;

import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.Order;

import java.util.List;

public interface OrderService {

    List<Order> getOrderListByCustomerId(String customerId);

    String generateOrderId();

    String generateRsultImageNameAndPath(String orderId);

    void generateOrder(String orderId, String resultImagePath, Generate generateEntity);

}
