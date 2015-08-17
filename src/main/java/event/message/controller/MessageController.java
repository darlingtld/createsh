package event.message.controller;

import event.coupon.pojo.Coupon;
import event.coupon.pojo.Voucher;
import event.coupon.service.CouponService;
import event.message.pojo.Message;
import event.message.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

/**
 * Created by darlingtld on 2015/8/9 0009.
 */
@Controller
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @RequestMapping(value = "/wechatid/{wechatid}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Message> getCouponList(@PathVariable("wechatid") String wechatid) {
        return messageService.getMessageList(wechatid);
    }

}
