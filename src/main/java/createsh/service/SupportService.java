package createsh.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import createsh.dao.SupportDao;
import createsh.pojo.CSMessage;
import createsh.pojo.Feedback;
import createsh.util.PropertyHolder;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

/**
 * Created by darlingtld on 2015/6/24 0024.
 */
@Service
public class SupportService {

    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(SupportService.class);
    private static RestTemplate restTemplate = new RestTemplate();

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
        logger.info("[Acess Token returned data] {}", retData);
        JSONObject jsonObject = JSON.parseObject(retData);
        String accessToken = jsonObject.getString("access_token");
        url = url.replace("ACCESS_TOKEN", accessToken);
        JSONObject response = new JSONObject();
        response.put("access_token", accessToken);
        response.put("touser", message.getString("openid"));
        response.put("msgtype", "text");
        JSONObject body = new JSONObject();
        body.put("content", "[客服回复]："+message.getString("message"));
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
    }
}
