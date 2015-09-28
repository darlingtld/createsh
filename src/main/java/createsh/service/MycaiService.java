package createsh.service;

import event.message.pojo.Message;
import event.message.service.MessageService;
import createsh.pojo.OrderStatus;
import createsh.pojo.Role;
import createsh.pojo.User;
import createsh.pojo.message.req.TextMessage;
import createsh.pojo.message.resp.Article;
import createsh.pojo.message.resp.NewsMessage;
import createsh.util.MessageUtil;
import createsh.util.PropertyHolder;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public String processRequest(HttpServletRequest request) {
        final String fromUserName;
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
                    String respContent = "您好，欢迎关注含嘉优品！\n梁源食品客服热线:\n4008051715";
                    TextMessage textMessage = new TextMessage();
                    textMessage.setToUserName(fromUserName);
                    textMessage.setFromUserName(toUserName);
                    textMessage.setCreateTime(new Date().getTime());
                    textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
                    textMessage.setContent(respContent);

                    Message message = new Message();
                    message.setOpenid(fromUserName);
                    message.setContent("欢迎您关注我们");
                    DateTime ts = new DateTime();
                    message.setTs(ts.toDate());
                    message.setRead(false);
                    messageService.createMessage(message);

                    new Thread() {
                        @Override
                        public void run() {
                            User user = new User();
                            user.setOpenid(fromUserName);
                            user.setRole(Role.USER.toString());
                            userService.saveOrUpdate(user);
                        }
                    }.start();

                    return MessageUtil.messageToXml(textMessage);
                } else if (eventType.equals(MessageUtil.EVENT_TYPE_UNSUBSCRIBE)) {
                } else if (eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {
                    String eventKey = requestMap.get("EventKey");
                    if (eventKey.equalsIgnoreCase(PropertyHolder.MENU_ONLINE_CS)) {
                        TextMessage textMessage = new TextMessage();
                        textMessage.setToUserName(fromUserName);
                        textMessage.setFromUserName(toUserName);
                        textMessage.setCreateTime(new Date().getTime());
                        textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
                        textMessage.setContent(String.format("亲,感谢关注含嘉优品\n" +
                                "在线客服每天8:30-24:00真人值守,全新全意为您服务!\n" +
                                "请描述一下您遇到的问题,我们将对应问题安排客服快速有效地帮助亲,谢谢!"));
                        return MessageUtil.messageToXml(textMessage);
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
//                return null;
            }


            NewsMessage newsMessage = new NewsMessage();
            newsMessage.setToUserName(fromUserName);
            newsMessage.setFromUserName(toUserName);
            newsMessage.setCreateTime(new Date().getTime());
            newsMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_NEWS);
            newsMessage.setFuncFlag(0);
            List<Article> articleList = new ArrayList<Article>();
            Article article = new Article();
            article.setTitle("含嘉优品");
            article.setDescription("梁源集团————含嘉优品̨");
            article.setPicUrl(PropertyHolder.SERVER + "/images/logo-bg.jpg");
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
