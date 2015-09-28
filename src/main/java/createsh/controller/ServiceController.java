package createsh.controller;

import com.alibaba.fastjson.JSONObject;
import createsh.pojo.CSMessage;
import createsh.pojo.Feedback;
import createsh.service.SupportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/service")
public class ServiceController {

    private static final Logger logger = LoggerFactory.getLogger(ServiceController.class);

    @Autowired
    private SupportService supportService;

    @RequestMapping(value = "/feedback", method = RequestMethod.POST, headers = "Content-Type=application/json")
    public
    @ResponseBody
    void submitFeedback(@RequestBody Feedback feedback) {
        logger.info("Feedback content {}", feedback);
        supportService.saveFeedback(feedback);
    }

    @RequestMapping(value = "/customer", method = RequestMethod.POST, headers = "Content-Type=application/json")
    public
    @ResponseBody
    void respondToMessage(@RequestBody JSONObject message) {
        logger.info("Message {}", message);
        supportService.respondToMessage(message);
    }

    @RequestMapping(value = "/csmessage", method = RequestMethod.GET)
    public
    @ResponseBody
    List<CSMessage> getCustomerMessages() {
        return supportService.getCustomerMessageList();
    }
}