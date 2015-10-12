package createsh.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import createsh.pojo.Order;
import createsh.pojo.TradeStat;
import createsh.pojo.Transaction;
import createsh.pojo.User;
import event.coupon.pojo.Coupon;
import event.coupon.pojo.Discount;
import event.coupon.pojo.Voucher;
import event.coupon.service.CouponService;
import org.joda.time.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by darlingtld on 2015/8/8 0008.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration("file:src/main/webapp/WEB-INF/mvc-dispatcher-servlet.xml")
public class TransactionServiceTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @Test
    public void populateTradeStat() throws ParseException {
        List<User> userList = userService.getAll();
        for (User user : userList) {
            if (user.getAccount() > 0) {
                TradeStat tradeStat = new TradeStat(user.getOpenid(), Transaction.DEPOSIT, 0, user.getAccount());
                transactionService.recordTransaction(tradeStat);
            }
        }


        List<Order> orderList = orderService.getAll();
        for (Order order : orderList) {
            JSONObject jsonObject = JSON.parseObject(order.getBill());
            double totalPrice = jsonObject.getDouble("totalPrice");

            TradeStat tradeStat = new TradeStat(order.getWechatId(), Transaction.EXPENSE, order.getId(), totalPrice);
            tradeStat.setTimestamp(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(order.getOrderTs()));
            transactionService.recordTransaction(tradeStat);
        }

    }

}
