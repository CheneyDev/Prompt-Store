package prompt.store.backend.controller;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.Order;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.service.OrderService;

@Controller
@RestController
public class OrderController {

    @Resource
    private OrderService orderService;

    @Value("${object_storage_url}")
    private String objectStorageUrl;

    @GetMapping("/getOrder")
    public RestBean<Order> getOrder(@RequestParam("orderID") String orderID) {
        Order order= orderService.getOrderById(orderID);
        order.setResultURL(objectStorageUrl);
        return RestBean.success(order);
    }

}
