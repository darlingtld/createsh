package createsh.controller;


import com.alibaba.fastjson.JSONObject;
import createsh.pojo.TradeStat;
import createsh.pojo.User;
import createsh.service.TransactionService;
import createsh.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by darlingtld on 2015/6/24 0024.
 */
@Controller
@RequestMapping("/transaction")
public class TransactionController {

    private static final Logger logger = LoggerFactory.getLogger(TransactionController.class);

    @Autowired
    private TransactionService transactionService;

    @RequestMapping(value = "/user/{openid}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<TradeStat> getUserTradeStat(@PathVariable("openid") String openid, HttpServletResponse response) {
        logger.info("Get trade stat for user {}", openid);

        return transactionService.getStat4User(openid);
    }

    @RequestMapping(value = "/user/{openid}/{year}/{month}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<TradeStat> getUserTradeStatMonth(@PathVariable("openid") String openid, @PathVariable("year") int year, @PathVariable("month") int month, HttpServletResponse response) {
        logger.info("Get trade stat for user {} year {} month {}", openid, year, month);

        return transactionService.getStat4User(openid, year, month);
    }

    @RequestMapping(value = "/stat", method = RequestMethod.GET)
    public
    @ResponseBody
    JSONObject getTotalTransactionStat() {
        logger.info("Get total transaction stat");

        return transactionService.getTotalTransactionStat();
    }

}
