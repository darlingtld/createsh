package createsh.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import createsh.dao.TransactionDao;
import event.coupon.dao.CouponDao;
import event.coupon.pojo.Coupon;
import event.coupon.pojo.Discount;
import event.coupon.pojo.Voucher;
import createsh.dao.OrderDao;
import createsh.dao.ProductDao;
import createsh.dao.UserDao;
import createsh.pojo.*;
import createsh.util.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Field;
import java.util.*;

/**
 * Created by darlingtld on 2015/5/16.
 */
@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    private static final String DELIVER_PAY = "DELIVER_PAY";
    private static final String ONLINE_PAY = "ONLINE_PAY";

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private ProductDao productDao;

    @Autowired
    private CouponDao couponDao;

    @Autowired
    private TransactionDao transactionDao;

    @Transactional
    public void save(Order order) {
        User user = userDao.getUserByWechatId(order.getWechatId());
        if (user != null) {
            user.setConsignee(order.getConsignee());
            user.setConsigneeContact(order.getConsigneeContact());
            user.setBuyerInfo(order.getBuyerInfo());
            user.setBuyerAddress(order.getBuyerAddress());
            userDao.update(user);
        } else {
            String unknownUser = "na";
            order.setUserId(unknownUser);
            user = new User();
            user.setOpenid(order.getWechatId());
            user.setNickname(unknownUser);
            user.setConsignee(order.getConsignee());
            user.setConsigneeContact(order.getConsigneeContact());
            user.setBuyerInfo(order.getBuyerInfo());
            user.setBuyerAddress(order.getBuyerAddress());
            userDao.save(user);
        }
        String code = generateConfirmCode();
        while (isConfirmCodeExisted(code)) {
            code = generateConfirmCode();
        }
        order.setConfirmCode(code);

        JSONObject jsonObject = JSON.parseObject(order.getBill());
        double totalPrice = jsonObject.getDouble("totalPrice");
        if (order.getPayMethod().equalsIgnoreCase(ONLINE_PAY)) {
            if (user.getAccount() - totalPrice < 0) {
                throw new RuntimeException("余额不足");
            } else {
                userDao.saveAccount(user.getUsername(), -totalPrice);
                order.setStatus(OrderStatus.PAID_NOT_DELIVERED);
            }
        } else if (order.getPayMethod().equalsIgnoreCase(DELIVER_PAY)) {
            order.setStatus(OrderStatus.NOT_DELIVERED);
        } else {
            throw new RuntimeException("pay method not supported yet!");
        }
        jsonObject.put("totalPrice", Utils.formatDouble(totalPrice, 2));
        order.setBill(jsonObject.toJSONString());
        markUsedCoupon(jsonObject.getString("usedCoupon"));

        orderDao.save(order);
    }


    private void markUsedCoupon(String couponJson) {
        Coupon coupon = JSON.parseObject(couponJson, Voucher.class);
        if (coupon == null) {
            coupon = JSON.parseObject(couponJson, Discount.class);
        }

        if (coupon == null) {
            return;
        } else {
            coupon.setUsed(true);
            couponDao.updateCoupon(coupon);
        }
    }

    @Transactional
    private boolean isConfirmCodeExisted(String code) {
        return orderDao.isConfirmCodeExisted(code);
    }

    private String generateConfirmCode() {
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());
        String value = String.valueOf(random.nextInt(1000000000));
        StringBuffer code = new StringBuffer(value);
        for (int i = 0; i < 9 - value.length(); i++) {
            code.insert(0, "0");
        }
        return code.toString();
    }

    @Transactional
    public List<Order> getListByUsername(String wechatid) {
        User user = userDao.getUserByWechatId(wechatid);
        return orderDao.getListByUsername(user.getUsername());
    }

    @Transactional
    public List<Order> getList(String wechatid) {
        return orderDao.getList(wechatid);
    }

    @Transactional
    public Order getById(int orderId) {
        return orderDao.getById(orderId);
    }

    @Transactional
    public List<Order> getAll() {
        return orderDao.getAll();
    }

    @Transactional
    public boolean update(Order order) {
        Order oldOrder = orderDao.getById(order.getId());
        JSONObject oldJO = JSON.parseObject(oldOrder.getBill());
        double oldTotalPrice = oldJO.getDouble("totalPrice");

        User user = userDao.getUserByWechatId(order.getWechatId());
        JSONObject jsonObject = JSON.parseObject(order.getBill());
        double totalPrice = jsonObject.getDouble("totalPrice");
        if (order.getStatus().equalsIgnoreCase(OrderStatus.PAID_NOT_DELIVERED)) {
            if (user.getAccount() - totalPrice < 0) {
                throw new RuntimeException("余额不足");
            } else {
                userDao.saveAccount(user.getUsername(), oldTotalPrice - totalPrice);
            }
        }
        jsonObject.put("totalPrice", Utils.formatDouble(totalPrice, 2));
        order.setBill(jsonObject.toJSONString());
        orderDao.update(order);
        transactionDao.updateTradeStat(new TradeStat(order.getWechatId(), Transaction.EXPENSE, order.getId(), totalPrice));
        return true;
    }

    @Transactional
    public List<Order> getLatestList(String wechatId, int count) {
        return orderDao.getLatestList(wechatId, count);
    }

    @Transactional
    public Order getOrderByConfirmCode(String confirmCode) {
        logger.info("Get order using confirm code {}", confirmCode);
        return orderDao.getByConfirmCode(confirmCode);
    }

    @Transactional
    public List<Product> getListByTimeFrame(String wechatid, Calendar then, Calendar now, String type) {
        logger.info("Get order of {} from {} to {} of type {}", wechatid, then.getTime().toString(), now.getTime().toString(), type);
        List<Order> orderList = orderDao.getListByTimeFrame(wechatid, then, now);
        List<Product> productList = new ArrayList<>();
        List<Product> allProductList = productDao.getByType(type);
        HashMap<Integer, Product> allProductMap = new HashMap<>();
        for (Product product : allProductList) {
            allProductMap.put(product.getId(), product);
        }
        for (Order order : orderList) {
            JSONObject jsonObject = JSON.parseObject(order.getBill());
            JSONArray jsonArray = jsonObject.getJSONArray("items");
            for (int i = 0; i < jsonArray.size(); i++) {
                Integer productId = jsonArray.getJSONObject(i).getInteger("productId");
                Product product = allProductMap.get(productId);
                if (!productList.contains(product)) {
                    if (product != null)
                        productList.add(product);
                }
            }
        }
        return productList;
    }

    @Transactional
    public List<Dispatch> getDispatchList() {
        List<Order> orderList = orderDao.getOrderListByStatus(OrderStatus.NOT_DELIVERED);
        List<Product> allProductList = productDao.getAll();
        HashMap<Integer, Product> allProductMap = new HashMap<>();
        for (Product product : allProductList) {
            allProductMap.put(product.getId(), product);
        }
        Map<Integer, Dispatch> dispatchMap = new HashMap<>();
        for (Order order : orderList) {
            JSONObject jsonObject = JSON.parseObject(order.getBill());
            JSONArray jsonArray = jsonObject.getJSONArray("items");
            for (int i = 0; i < jsonArray.size(); i++) {
                Integer productId = jsonArray.getJSONObject(i).getInteger("productId");
                Integer amount = jsonArray.getJSONObject(i).getInteger("amount");
                String unit = jsonArray.getJSONObject(i).getString("productUnit");
                Product product = allProductMap.get(productId);
                if (product == null) {
                    continue;
                }
                if (dispatchMap.containsKey(productId)) {
                    dispatchMap.get(productId).setQuantity(dispatchMap.get(productId).getQuantity() + amount);
                    dispatchMap.get(productId).getOrderInfoList().add(getKeyInfo(order, amount, unit));
                } else {
                    Dispatch dispatch = new Dispatch();
                    dispatch.setProduct(product);
                    dispatch.setQuantity(amount);
                    List<String> orders = new ArrayList<>();
                    orders.add(getKeyInfo(order, amount, unit));
                    dispatch.setOrderInfoList(orders);
                    dispatch.setUnit(unit);
                    dispatchMap.put(productId, dispatch);
                }

            }
        }
        return new ArrayList<>(dispatchMap.values());
    }

    private String getKeyInfo(Order order, Integer amount, String unit) {
        return String.format("[数量]%s%s [送货时间]%s [收件人]%s %s [收货地址]%s [电话]%s [下单时间]%s", amount, unit, order.getDeliveryTs(), order.getConsignee(), order.getBuyerInfo(), order.getBuyerAddress(), order.getConsigneeContact(), order.getOrderTs());
    }

    public List<String> getStatusList() throws IllegalAccessException {
        List<String> statusList = new ArrayList<>();
        Field[] fields = OrderStatus.class.getDeclaredFields();
        for (Field field : fields) {
            statusList.add((String) field.get(field.getName()));
        }
        return statusList;
    }

    public JSONArray getOrderStatusList() throws IllegalAccessException {
        JSONArray orderList = new JSONArray();
        Field[] fields = OrderStatus.class.getDeclaredFields();
        for (Field field : fields) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("key", field.getName());
            jsonObject.put("value", field.get(field.getName()));
            orderList.add(jsonObject);
        }
        return orderList;
    }

    @Transactional
    public void deleteOrder(int orderId) {
        Order order = getById(orderId);
        JSONObject jsonObject = JSON.parseObject(order.getBill());
        double totalPrice = jsonObject.getDouble("totalPrice");
        if (order.getStatus().contains(OrderStatus.NOT_DELIVERED.toString())) {
            if (order.getStatus().equals(OrderStatus.PAID_NOT_DELIVERED.toString())) {
                userDao.saveAccount(order.getWechatId(), totalPrice);
                transactionDao.recordTransaction(new TradeStat(order.getWechatId(), Transaction.REFUND, orderId, totalPrice));
            } else {
                transactionDao.deleteTradeStatByOrderId(orderId);
            }
            orderDao.deleteOrder(orderId);
        } else {
            throw new IllegalStateException(String.format("无法删除[订单状态为%s]", order.getStatus()));
        }
    }

    @Transactional
    public List<Order> getByStatus(String notDelivered) {
        return orderDao.getOrderListByStatus(notDelivered);
    }
}
