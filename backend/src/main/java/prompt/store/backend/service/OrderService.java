package prompt.store.backend.service;

import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.Order;
import prompt.store.backend.entity.OrderPrompt;

import java.util.List;

public interface OrderService {

    Order getOrderById(String orderId);

    String generateOrderId();

    String generateRsultImageNameAndPath(String orderId);

    void generateOrder(String orderId, String resultImagePath, Generate generateEntity);

    OrderPrompt getOrderPromptByOrderId(String orderId);

    List<Order> getOrderListByUsername(String customerId);

    String getOrdersTotalSum();

    int getOrdersTotalCount();
}
