package prompt.store.backend.mapper;

import org.apache.ibatis.annotations.*;
import prompt.store.backend.entity.Order;
import prompt.store.backend.entity.OrderPrompt;

import java.util.List;

@Mapper
public interface OrderMapper {

    @Select("SELECT * FROM `order` WHERE customer_id = #{customerId}")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "order_id", property = "orderId"),
            @Result(column = "customer_name", property = "customerName"),
            @Result(column = "order_date", property = "orderDate"),
            @Result(column = "product_name", property = "productName"),
            @Result(column = "quantity", property = "quantity"),
            @Result(column = "unit_price", property = "unitPrice"),
            @Result(column = "total_price", property = "totalPrice"),
            @Result(column = "order_prompt", property = "orderPrompt"),
            @Result(column = "result_path", property = "resultPath")
    })
    List<Order> getOrderListByCustomerId(String customerId);

    @Select("SELECT * FROM `order` WHERE order_id = #{orderId}")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "order_id", property = "orderId"),
            @Result(column = "customer_name", property = "customerName"),
            @Result(column = "order_date", property = "orderDate"),
            @Result(column = "product_name", property = "productName"),
            @Result(column = "quantity", property = "quantity"),
            @Result(column = "unit_price", property = "unitPrice"),
            @Result(column = "total_price", property = "totalPrice"),
            @Result(column = "order_prompt", property = "orderPrompt"),
            @Result(column = "result_path", property = "resultPath")
    })
    Order getOrderByOrderId(String orderId);

    @Insert("INSERT INTO `order` (order_id, customer_name, order_date, product_name, quantity, unit_price, total_price, result_path) " +
            "VALUES (#{order.orderId}, #{order.customerName}, #{order.orderDate}, #{order.productName}, #{order.quantity}, #{order.unitPrice}, " +
            "#{order.totalPrice}, #{order.resultPath})")
    void insertOrder(@Param("order") Order order);

    @Insert("INSERT INTO order_prompt (order_id, main_image_path, prompt, negative_prompt, model, sampler, width, height, steps, guidance_scale, seed) " +
            "VALUES (#{orderPrompt.orderId}, #{orderPrompt.mainImagePath}, #{orderPrompt.prompt}, #{orderPrompt.negativePrompt}, #{orderPrompt.model}, #{orderPrompt.sampler}, #{orderPrompt.width}, #{orderPrompt.height}, #{orderPrompt.steps}, #{orderPrompt.guidanceScale}, #{orderPrompt.seed})")
    void insertOrderPrompt(@Param("orderPrompt") OrderPrompt orderPrompt);


    @Select("SELECT * FROM order_prompt WHERE order_id = #{orderId}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "orderId", column = "order_id"),
            @Result(property = "mainImagePath", column = "main_image_path"),
            @Result(property = "prompt", column = "prompt"),
            @Result(property = "negativePrompt", column = "negative_prompt"),
            @Result(property = "width", column = "width"),
            @Result(property = "height", column = "height"),
            @Result(property = "steps", column = "steps"),
            @Result(property = "guidanceScale", column = "guidance_scale"),
            @Result(property = "seed", column = "seed"),
            @Result(property = "model", column = "model"),
            @Result(property = "sampler", column = "sampler")
    })
    OrderPrompt getOrderPromptByOrderId(String orderId);

}
