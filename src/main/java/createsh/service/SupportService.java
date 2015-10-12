package createsh.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.zxing.common.StringUtils;
import createsh.dao.SupportDao;
import createsh.pojo.CSMessage;
import createsh.pojo.Feedback;
import createsh.util.PropertyHolder;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * Created by darlingtld on 2015/6/24 0024.
 */
@Service
public class SupportService {

    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(SupportService.class);
    private static RestTemplate restTemplate = new RestTemplate();
    private static boolean isAutoReplyEnabled = false;
    private static String autoreplyContent = "你好，客服稍后为您服务";
    private static LinkedBlockingQueue<CSMessage> csMessageQueue = new LinkedBlockingQueue<>();

//    @PostConstruct
//    public void init() {
//        new Thread() {
//            @Override
//            public void run() {
//                for (int i = 0; i < 10; i++) {
//                    try {
//                        Thread.sleep(5000);
//                        CSMessage csMessage = new CSMessage();
//                        csMessage.setMessage(String.valueOf(System.currentTimeMillis()));
//                        csMessage.setOpenid("oh88lwyr0lDwuey9tr3o1hUIajPA");
//                        csMessageQueue.put(csMessage);
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//        }.start();
//
//    }

    @Autowired
    private SupportDao supportDao;


    @Transactional
    public void saveFeedback(Feedback feedback) {
        supportDao.saveFeedback(feedback);
    }

    public void respondToMessage(JSONObject message) {
        String url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN";
        String getAccessTokenUrl = String.format("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s", PropertyHolder.APPID, PropertyHolder.APPSECRET);
        logger.info("[Access Token URL] {}", getAccessTokenUrl);
        String retData = restTemplate.getForObject(getAccessTokenUrl, String.class, new HashMap<String, Object>());
        logger.info("[Access Token returned data] {}", retData);
        JSONObject jsonObject = JSON.parseObject(retData);
        String accessToken = jsonObject.getString("access_token");
        url = url.replace("ACCESS_TOKEN", accessToken);
        JSONObject response = new JSONObject();
        response.put("access_token", accessToken);
        response.put("touser", message.getString("openid"));
        response.put("msgtype", "text");
        JSONObject body = new JSONObject();
        body.put("content", "[客服回复]：" + message.getString("message"));
        response.put("text", body);
        logger.info(response.toJSONString());
        restTemplate.postForObject(url, response, String.class);
    }

    @Transactional
    public List<CSMessage> getCustomerMessageList() {
        return supportDao.getCSMessageList();
    }

    @Transactional
    public void saveCSMessage(CSMessage csMessage) {
        logger.info("CSMessage {}", csMessage);
        supportDao.saveCSMessage(csMessage);
        //push message to customer service
        csMessageQueue.add(csMessage);
        if (isAutoReplyEnabled) {
            JSONObject message = new JSONObject();
            message.put("openid", csMessage.getOpenid());
            message.put("message", autoreplyContent);
            respondToMessage(message);
        }
    }

    public LinkedBlockingQueue<CSMessage> getCsMessageQueue() {
        return csMessageQueue;
    }

    public void autoreply(boolean isEnabled, String content) {
        isAutoReplyEnabled = isEnabled;
        if (!"".equals(content.trim())) {
            autoreplyContent = content;
        }
    }
}
