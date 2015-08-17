package mycai.service;

import event.message.pojo.Message;
import event.message.service.MessageService;
import mycai.pojo.OrderStatus;
import mycai.pojo.Role;
import mycai.pojo.User;
import mycai.pojo.message.req.TextMessage;
import mycai.pojo.message.resp.Article;
import mycai.pojo.message.resp.NewsMessage;
import mycai.util.MessageUtil;
import mycai.util.PropertyHolder;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Created by tangld on 2015/5/19.
 */
@Service
public class MycaiService {

    @Autowired
    private EventService eventService;

    @Autowired
    private TulingApiService tulingApiService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private MessageService messageService;

    public String processRequest(HttpServletRequest request) {
        String fromUserName;
        String toUserName;
        try {
            Map<String, String> requestMap = MessageUtil.parseXml(request);
            fromUserName = requestMap.get("FromUserName");
            toUserName = requestMap.get("ToUserName");

            String msgType = requestMap.get("MsgType");

            String content = requestMap.containsKey("Content") ? requestMap.get("Content").trim() : "";

            if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {
                String eventType = requestMap.get("Event");
                if (eventType.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) {
                    String respContent = "您好，欢迎关注送达\n我们提供各类蔬菜/水果/酒水等食材的送达服务！";
                    TextMessage textMessage = new TextMessage();
                    textMessage.setToUserName(fromUserName);
                    textMessage.setFromUserName(toUserName);
                    textMessage.setCreateTime(new Date().getTime());
                    textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
                    textMessage.setContent(respContent);

                    Message message = new Message();
                    message.setOpenid(fromUserName);
                    message.setContent("欢迎您使用送达");
                    DateTime ts = new DateTime();
                    message.setTs(ts.toDate());
                    message.setRead(false);
                    messageService.createMessage(message);

                    return MessageUtil.messageToXml(textMessage);
                } else if (eventType.equals(MessageUtil.EVENT_TYPE_UNSUBSCRIBE)) {
                } else if (eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {
                    String eventKey = requestMap.get("EventKey");
                    if (PropertyHolder.MENU_ABOUT_US.equals(eventKey)) {
                        return eventService.doAboutUs(fromUserName, toUserName);
                    } else if (PropertyHolder.MENU_NEW_PRODUCT.equals(eventKey)) {
                        return eventService.doProductInquiry(fromUserName, toUserName);
                    } else if (PropertyHolder.MENU_POST_SALE_SERVICE.equals(eventKey)) {
                        return eventService.doPostSaleService(fromUserName, toUserName);
                    }
                }
            } else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_TEXT)) {
                if ("code".equals(content.toLowerCase())) {
                    User user = userService.getUserByWechatId(fromUserName);
                    if (user != null && Role.DELIVERYMAN.toString().equalsIgnoreCase(user.getRole())) {
                        return eventService.doCodeIntro(fromUserName, toUserName);
                    }
                } else if (eventService.getCodeSet().contains(content.toLowerCase())) {
                    return eventService.respond(content, fromUserName, toUserName);
                } else if (Pattern.compile("\\d{9}").matcher(content).find()) {
                    //check if the request comes from a deliveryman
                    User user = userService.getUserByWechatId(fromUserName);
                    if (Role.DELIVERYMAN.toString().equalsIgnoreCase(user.getRole())) {
                        if (orderService.getOrderByConfirmCode(content) == null) {
                            TextMessage textMessage = new TextMessage();
                            textMessage.setToUserName(fromUserName);
                            textMessage.setFromUserName(toUserName);
                            textMessage.setCreateTime(new Date().getTime());
                            textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
                            textMessage.setContent(String.format("该订单不存在"));
                            return MessageUtil.messageToXml(textMessage);
                        } else if (orderService.getOrderByConfirmCode(content).getStatus().equals(OrderStatus.DELIVERED_PAID)) {
                            TextMessage textMessage = new TextMessage();
                            textMessage.setToUserName(fromUserName);
                            textMessage.setFromUserName(toUserName);
                            textMessage.setCreateTime(new Date().getTime());
                            textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
                            textMessage.setContent(String.format("订单%s已配送(已付款)", content));
                            return MessageUtil.messageToXml(textMessage);
                        } else {
                            NewsMessage newsMessage = new NewsMessage();
                            newsMessage.setToUserName(fromUserName);
                            newsMessage.setFromUserName(toUserName);
                            newsMessage.setCreateTime(new Date().getTime());
                            newsMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_NEWS);
                            newsMessage.setFuncFlag(0);
                            List<Article> articleList = new ArrayList<Article>();
                            Article article = new Article();
                            article.setTitle("订单确认码 ：" + content);
                            article.setDescription("送达订单确认̨");
                            article.setPicUrl(PropertyHolder.SERVER + "/images/confirm.jpg");
                            article.setUrl(PropertyHolder.SERVER + "/confirm_deliv.html?confirm_code=" + content);
                            articleList.add(article);
                            newsMessage.setArticleCount(articleList.size());
                            newsMessage.setArticles(articleList);
                            return MessageUtil.messageToXml(newsMessage);
                        }
                    }

                }
                String respContent = tulingApiService.getTulingResult(content);
                TextMessage textMessage = new TextMessage();
                textMessage.setToUserName(fromUserName);
                textMessage.setFromUserName(toUserName);
                textMessage.setCreateTime(new Date().getTime());
                textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
                textMessage.setContent(respContent);
                return MessageUtil.messageToXml(textMessage);
            }


            NewsMessage newsMessage = new NewsMessage();
            newsMessage.setToUserName(fromUserName);
            newsMessage.setFromUserName(toUserName);
            newsMessage.setCreateTime(new Date().getTime());
            newsMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_NEWS);
            newsMessage.setFuncFlag(0);
            List<Article> articleList = new ArrayList<Article>();
            Article article = new Article();
            article.setTitle("送达");
            article.setDescription("上海三林地区最大的农产品移动电商平台̨");
            article.setPicUrl(PropertyHolder.SERVER + "/images/logo.jpg");
            article.setUrl(PropertyHolder.SERVER);
            articleList.add(article);
            newsMessage.setArticleCount(articleList.size());
            newsMessage.setArticles(articleList);
            return MessageUtil.messageToXml(newsMessage);
        } catch (Exception e) {
            e.printStackTrace();

        }
        return null;
    }
}
