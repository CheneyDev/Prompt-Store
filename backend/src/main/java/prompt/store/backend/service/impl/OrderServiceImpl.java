package prompt.store.backend.service.impl;

import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import prompt.store.backend.entity.Generate;
import prompt.store.backend.entity.Order;
import prompt.store.backend.entity.OrderPrompt;
import prompt.store.backend.entity.ProductPrompt;
import prompt.store.backend.mapper.OrderMapper;
import prompt.store.backend.service.OrderService;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {


    @Resource
    OrderMapper orderMapper;

    @Value("${object_storage_url}")
    private String objectStorageUrl;

    @Override
    public List<Order> getOrderListByCustomerId(String customerId) {
        List<Order> orderList = orderMapper.getOrderListByCustomerId(customerId);
        orderList.forEach(order -> {
            order.setResultURL(objectStorageUrl);
        });
        return orderList;
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
        order.setOrderDate(new java.sql.Date(System.currentTimeMillis()));
        order.setProductName(URLDecoder.decode(generate.getModel(), StandardCharsets.UTF_8));
        order.setQuantity(1);
        order.setUnitPrice(0.0F);
        order.setTotalPrice(0.0F);

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
}
