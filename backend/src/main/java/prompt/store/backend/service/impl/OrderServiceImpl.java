package prompt.store.backend.service.impl;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.amazonaws.services.s3.AmazonS3;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Account;
import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.order.Order;
import prompt.store.backend.entity.order.OrderAnalysis;
import prompt.store.backend.entity.order.OrderPrompt;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.mapper.AccountMapper;
import prompt.store.backend.mapper.OrderMapper;
import prompt.store.backend.service.OrderService;
import prompt.store.backend.utils.ObjectStorageUtil;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {


    @Resource
    OrderMapper orderMapper;
    @Resource
    AccountMapper accountMapper;

    @Resource
    private ObjectStorageUtil objectStorageUtil;

    @Value("${object_storage_url}")
    private String objectStorageUrl;

    @Value("${cloudflare.r2.bucket}")
    public String bucketName;

    @Override
    public Order getOrderById(String orderId) {
        return orderMapper.getOrderByOrderId(orderId);
    }

    @Override
    public String generateOrderId() {
        return "order"+System.currentTimeMillis();
    }

    @Override
    public String generateRsultImageNameAndPath(String orderId) {
        String resultImageName = orderId + ".jpg";
        return "resources/order_result_image/" + resultImageName;
    }

    @Override
    public void generateOrder(String orderId, String resultImagePath, Generate generate) {
        Order order = new Order();
        OrderPrompt orderPrompt = new OrderPrompt();

        order.setOrderId(orderId);
        order.setCustomerName(URLDecoder.decode(generate.getUsername(), StandardCharsets.UTF_8));
        order.setOrderDate(new Timestamp(new Date().getTime()));
        order.setProductName(URLDecoder.decode(generate.getModel(), StandardCharsets.UTF_8));
        order.setQuantity(1);
        order.setUnitPrice(2.0F);
        order.setTotalPrice(2.0F);

        order.setResultPath(resultImagePath);

        String prompt = URLDecoder.decode(generate.getPrompt(), StandardCharsets.UTF_8);
        String negativePrompt = URLDecoder.decode(generate.getNegativePrompt(), StandardCharsets.UTF_8);
        String model = URLDecoder.decode(generate.getModel(), StandardCharsets.UTF_8);
        String sampler = URLDecoder.decode(generate.getSampler(), StandardCharsets.UTF_8);
        String width = URLDecoder.decode(generate.getWidth(), StandardCharsets.UTF_8);
        String height = URLDecoder.decode(generate.getHeight(), StandardCharsets.UTF_8);
        String steps = URLDecoder.decode(generate.getSteps(), StandardCharsets.UTF_8);
        String guidanceScale = URLDecoder.decode(generate.getGuidanceScale(), StandardCharsets.UTF_8);
        String seed = URLDecoder.decode(generate.getSeed(), StandardCharsets.UTF_8);

        orderPrompt.setOrderId(orderId);
        orderPrompt.setMainImagePath(resultImagePath);
        orderPrompt.setPrompt(prompt);
        orderPrompt.setNegativePrompt(negativePrompt);
        orderPrompt.setModel(model);
        orderPrompt.setSampler(ProductPrompt.Sampler.valueOf(sampler));
        orderPrompt.setWidth(Integer.parseInt(width));
        orderPrompt.setHeight(Integer.parseInt(height));
        orderPrompt.setSteps(Integer.parseInt(steps));
        orderPrompt.setGuidanceScale(Integer.parseInt(guidanceScale));
        orderPrompt.setSeed(Integer.parseInt(seed));

        orderMapper.insertOrder(order);
        orderMapper.insertOrderPrompt(orderPrompt);
    }

    @Override
    public OrderPrompt getOrderPromptByOrderId(String orderId) {
        OrderPrompt orderPrompt = orderMapper.getOrderPromptByOrderId(orderId);
        orderPrompt.setMainImageUrl(objectStorageUrl);
        return orderPrompt;
    }

    @Override
    public List<Order> getOrderListByUsername(String customerId) {
        List<Order> orderList=orderMapper.getOrderListByUsername(customerId);
        orderList.forEach(order -> {
            order.setResultURL(objectStorageUrl);
        });
        return orderList;
    }

    @Override
    public List<Order> getOrderListByUsernameWithPagination(String customerId, int page, int pageSize) {
        int offset=(page-1)*pageSize;
        List<Order> orderList=orderMapper.getOrderListByUsernameWithPagination(customerId,pageSize,offset);
        orderList.forEach(order -> {
            order.setResultURL(objectStorageUrl);
        });
        return orderList;
    }

    @Override
    public List<Order> getAllOrdersWithPagination(int page, int pageSize) {
        int offset=(page-1)*pageSize;
        List<Order> orderList=orderMapper.getAllOrdersWithPagination(pageSize,offset);
        orderList.forEach(order -> {
            order.setResultURL(objectStorageUrl);
        });
        return orderList;
    }

    @Override
    public String getOrdersTotalSum() {
        return orderMapper.getOrdersTotalSum();
    }

    @Override
    public int getOrdersTotalCount() {
        return orderMapper.getOrdersTotalCount();
    }

    @Override
    public List<OrderAnalysis> getOrderTotalSumByYear(String year) {
        return orderMapper.getOrderTotalSumByYear(year);
    }

    @Override
    public String getTopFiveOrders() {
        // 创建Json返回体
        JSONArray jsonArray = new JSONArray();

        List<Order> orderList = orderMapper.getTopFiveOrders();
        orderList.forEach(order -> {
            Account account = accountMapper.getAvatarPathAndEmailByUsername(order.getCustomerName());
            account.setAvatarURL(objectStorageUrl);
            if (account != null) {
                String avatarURL = account.getAvatarURL();
                String email = account.getEmail();
                String orderTotalPrice = String.valueOf(order.getTotalPrice());
                String username = order.getCustomerName();
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("username", username);
                jsonObject.put("email", email);
                jsonObject.put("orderTotalPrice", orderTotalPrice);
                jsonObject.put("avatarURL", avatarURL);
                jsonArray.add(jsonObject);
            }
        });
        return jsonArray.toJSONString();
    }

    @Override
    public void updateOrderByOrderId(String orderId, String customerName, String orderDate, String totalPrice) {
        orderMapper.updateOrderByOrderId(orderId,customerName,orderDate,totalPrice);
    }

    @Override
    public void deleteOrderByOrderId(String orderId) {
        orderMapper.deleteOrderByOrderId(orderId);
        AmazonS3 s3Client = objectStorageUtil.initS3Client();
        String filePath = "resources/order_result_image/" + orderId + ".jpg";
        objectStorageUtil.deleteFile(s3Client, bucketName, filePath);
    }

    @Override
    public List<OrderPrompt> getAllPublicOrderPrompt() {
        List<OrderPrompt> orderPromptList=orderMapper.getAllPublicOrderPrompt();
        orderPromptList.forEach(orderPrompt -> {
            orderPrompt.setMainImageUrl(objectStorageUrl);
        });
        return orderPromptList;
    }

}
