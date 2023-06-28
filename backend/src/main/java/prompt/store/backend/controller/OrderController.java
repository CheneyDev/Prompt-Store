package prompt.store.backend.controller;

import com.alibaba.fastjson2.JSONObject;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import prompt.store.backend.entity.RestBean;
import prompt.store.backend.entity.order.Order;
import prompt.store.backend.entity.order.OrderAnalysis;
import prompt.store.backend.entity.order.OrderPrompt;
import prompt.store.backend.service.AccountService;
import prompt.store.backend.service.OrderService;

import java.util.List;

@Controller
@RestController
public class OrderController {

    @Resource
    private OrderService orderService;
    @Resource
    private AccountService accountService;

    @Value("${object_storage_url}")
    private String objectStorageUrl;

    private void updateLastActivityTimestamp() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            String userName = authentication.getName();
            accountService.updateLastActivityTimestampByUsername(userName);
            accountService.updateOnlineStatusByUsername(userName, "online");
        }
    }


    @GetMapping("/getOrder")
    public RestBean<Order> getOrder(@RequestParam("orderID") String orderID) {
        Order order = orderService.getOrderById(orderID);
        order.setResultURL(objectStorageUrl);
        updateLastActivityTimestamp();
        return RestBean.success(order);
    }

    @GetMapping("/getOrderPromptByOrderId")
    public RestBean<OrderPrompt> getOrderPromptByOrderId(@RequestParam("orderID") String orderID) {
        OrderPrompt orderPrompt = orderService.getOrderPromptByOrderId(orderID);
        updateLastActivityTimestamp();
        return RestBean.success(orderPrompt);
    }

    @GetMapping("/getOrderListByUsername")
    public RestBean<List<Order>> getOrderListByUsername(@RequestParam("username") String username) {
        List<Order> orderList = orderService.getOrderListByUsername(username);
        updateLastActivityTimestamp();
        return RestBean.success(orderList);
    }

    @GetMapping("/getOrderListByUsernameWithPagination")
    public RestBean<List<Order>> getOrderListByUsernameWithPagination(@RequestParam("username") String username,
                                                                      @RequestParam("page") int page,
                                                                      @RequestParam("pageSize") int pageSize) {
        List<Order> orderList = orderService.getOrderListByUsernameWithPagination(username, page, pageSize);
        updateLastActivityTimestamp();
        return RestBean.success(orderList);
    }

    @GetMapping("/getAllOrdersWithPagination")
    public RestBean<List<Order>> getAllOrdersWithPagination(@RequestParam("page") int page,
                                                            @RequestParam("pageSize") int pageSize) {
        List<Order> orderList = orderService.getAllOrdersWithPagination(page, pageSize);
        updateLastActivityTimestamp();
        return RestBean.success(orderList);
    }

    @GetMapping("/getOrdersTotalSum")
    public RestBean<String> getOrdersTotalSum() {
        String ordersTotalSum = orderService.getOrdersTotalSum();
        return RestBean.success(ordersTotalSum);
    }

    @GetMapping("/getOrdersTotalCount")
    public RestBean<String> getOrdersTotalCount() {
        String ordersTotalCount = String.valueOf(orderService.getOrdersTotalCount());
        return RestBean.success(ordersTotalCount);
    }

    @GetMapping("/getOrderTotalSumByYear")
    public RestBean<String> getOrderTotalSumByYear(@RequestParam("year") String year) {
        List<OrderAnalysis> orderTotalSumByYear = orderService.getOrderTotalSumByYear(year);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("orderTotalSumByYear", orderTotalSumByYear);
        return RestBean.success(jsonObject.toJSONString());
    }

    @GetMapping("/getTopFiveOrders")
    public RestBean<String> getTopFiveOrders() {
        return RestBean.success(orderService.getTopFiveOrders());
    }

    @PostMapping("updateOrderByOrderId")
    public RestBean<String> updateOrderByOrderId(@RequestParam("orderID") String orderID,
                                                 @RequestParam("customerName") String customerName,
                                                 @RequestParam("orderDate") String orderDate,
                                                 @RequestParam("totalPrice") String totalPrice) {
        String[] orderDateArray = orderDate.split(" ");
        String[] orderDateArray1 = orderDateArray[0].split("/");
        String[] orderDateArray2 = orderDateArray[1].split(":");
        orderDate = orderDateArray1[2] + "-" + orderDateArray1[0] + "-" + orderDateArray1[1] + " " + orderDateArray2[0] + ":" + orderDateArray2[1] + ":" + orderDateArray2[2];
        System.out.println(orderID + " " + customerName + " " + orderDate + " " + totalPrice);
        orderService.updateOrderByOrderId(orderID, customerName, orderDate, totalPrice);
        return RestBean.success("success");
    }

    @PostMapping("deleteOrderByOrderId")
    public RestBean<String> deleteOrderByOrderId(@RequestParam("orderID") String orderID) {
        orderService.deleteOrderByOrderId(orderID);
        return RestBean.success("success");
    }

    @GetMapping("/getAllPublicOrderPrompt")
    public RestBean<List<OrderPrompt>> getAllPublicOrderPrompt() {
        List<OrderPrompt> orderPromptList = orderService.getAllPublicOrderPrompt();
        updateLastActivityTimestamp();
        return RestBean.success(orderPromptList);
    }
}
