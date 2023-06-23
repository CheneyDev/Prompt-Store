package prompt.store.backend.service;

import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.order.Order;
import prompt.store.backend.entity.order.OrderAnalysis;
import prompt.store.backend.entity.order.OrderPrompt;

import java.util.List;

public interface OrderService {

    Order getOrderById(String orderId);

    String generateOrderId();

    String generateRsultImageNameAndPath(String orderId);

    void generateOrder(String orderId, String resultImagePath, Generate generateEntity);

    OrderPrompt getOrderPromptByOrderId(String orderId);

    List<Order> getOrderListByUsername(String customerId);

    List<Order> getOrderListByUsernameWithPagination(String customerId, int page, int pageSize);

    String getOrdersTotalSum();

    int getOrdersTotalCount();

    List<OrderAnalysis> getOrderTotalSumByYear(String year);

    String getTopFiveOrders();
}
