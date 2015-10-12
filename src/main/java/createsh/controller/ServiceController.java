package createsh.controller;

import com.alibaba.fastjson.JSONObject;
import createsh.pojo.CSMessage;
import createsh.pojo.Feedback;
import createsh.service.SupportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Random;

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

    @RequestMapping(value = "/csmessage/push", method = RequestMethod.GET)
    public
    @ResponseBody
    String pushCustomerMessages(HttpServletResponse response) {
        response.setContentType("text/event-stream");
        response.setHeader("Cache-Control", "no-cache");
//        System.out.println(supportService.getCsMessageQueue().size());
        CSMessage csMessage = supportService.getCsMessageQueue().poll();
        String data = "data:" + JSONObject.toJSONString(csMessage) + "\n\n";
        return data;

    }

    @RequestMapping(value = "/enable_auto_reply/{isEnabled}", method = RequestMethod.POST, headers = "Content-Type=application/json")
    public
    @ResponseBody
    void enableAutoReply(@PathVariable("isEnabled") boolean isEnabled, @RequestBody JSONObject jsonObject) {
        logger.info("Enable auto reply {}", isEnabled);
        String content = jsonObject.getString("content");
        supportService.autoreply(isEnabled, content);
    }


}