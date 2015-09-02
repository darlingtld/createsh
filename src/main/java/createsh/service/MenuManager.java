package createsh.service;

/**
 * Created by darlingtld on 2015/2/20.
 */


import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import createsh.pojo.AccessToken;
import createsh.pojo.button.ClickButton;
import createsh.pojo.button.ComplexButton;
import createsh.pojo.button.ViewButton;
import createsh.util.PropertyHolder;
import createsh.util.WeixinUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class MenuManager {
    private static Logger log = LoggerFactory.getLogger(MenuManager.class);

    public static void main(String[] args) throws UnsupportedEncodingException {
        String appId = PropertyHolder.APPID;
        String appSecret = PropertyHolder.APPSECRET;

        AccessToken at = WeixinUtil.getAccessToken(appId, appSecret);
        String jsonMenu = getMenu().toJSONString();
        log.debug(jsonMenu);
        if (null != at) {
            int result = WeixinUtil.createMenu(jsonMenu, at.getToken());

            if (0 == result) {
                log.info("菜单创建成功");
            } else {
                log.info("菜单创建失败，错误码：{}", result);
            }
        }
    }

    private static JSONObject getMenu() throws UnsupportedEncodingException {

        /**
         * https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
         */
        String oauthUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=$appid&redirect_uri=$redirect_uri&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";

        ViewButton btn11 = new ViewButton();
        btn11.setName(PropertyHolder.MENU_GO_ORDER);
        btn11.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER, "UTF-8")));

        ViewButton btn12 = new ViewButton();
        btn12.setName(PropertyHolder.MENU_MY_ORDER);
        btn12.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/myorder.html", "UTF-8")));

        ViewButton btn13 = new ViewButton();
        btn13.setName(PropertyHolder.MENU_MY_ACCOUNT);
        btn13.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/myaccount.html", "UTF-8")));


        ViewButton btn21 = new ViewButton();
        btn21.setName(PropertyHolder.MENU_ABOUT_LIANGYUAN);
        btn21.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/about.html", "UTF-8")));

        ViewButton btn22 = new ViewButton();
        btn22.setName(PropertyHolder.MENU_RICE_KNOWLEDGE);
        btn22.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/rice_knowledge.html", "UTF-8")));

        ViewButton btn23 = new ViewButton();
        btn23.setName(PropertyHolder.MENU_COOK_TRICKS);
        btn23.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/cook_tricks.html", "UTF-8")));

        ViewButton btn31 = new ViewButton();
        btn31.setName(PropertyHolder.MENU_FEEDBACK);
        btn31.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/feedback.html", "UTF-8")));

        ViewButton btn32 = new ViewButton();
        btn32.setName(PropertyHolder.MENU_CONSIGNEE_INFO);
        btn32.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/consignee_info.html", "UTF-8")));

        ViewButton btn33 = new ViewButton();
        btn33.setName(PropertyHolder.MENU_POST_SALE_RULE);
        btn33.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/postsale_rule.html", "UTF-8")));

        ViewButton btn34 = new ViewButton();
        btn34.setName(PropertyHolder.MENU_SHOP_INFO);
        btn34.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/shop_info.html", "UTF-8")));

        ViewButton btn35 = new ViewButton();
        btn35.setName(PropertyHolder.MENU_ONLINE_CS);
        btn35.setUrl(oauthUrl.replace("$appid", PropertyHolder.APPID).replace("$redirect_uri", URLEncoder.encode(PropertyHolder.SERVER + "/online_cs.html", "UTF-8")));

        ComplexButton mainBtn1 = new ComplexButton();
        mainBtn1.setName(PropertyHolder.MENU_SHOPPING_MALL);
        mainBtn1.setSub_button(new ViewButton[]{btn11, btn12, btn13});

        ComplexButton mainBtn2 = new ComplexButton();
        mainBtn2.setName(PropertyHolder.MENU_LIANGYUAN_ENCYCLO);
        mainBtn2.setSub_button(new ViewButton[]{btn21, btn22, btn23});

        ComplexButton mainBtn3 = new ComplexButton();
        mainBtn3.setName(PropertyHolder.MENU_POST_SALE_SERVICE);
        mainBtn3.setSub_button(new ViewButton[]{btn31, btn32, btn33, btn34, btn35});

        JSONArray jsonArray = new JSONArray();
        jsonArray.add(mainBtn1);
        jsonArray.add(mainBtn2);
        jsonArray.add(mainBtn3);

        JSONObject menu = new JSONObject();
        menu.put("button", jsonArray);
        System.out.println(menu);
        return menu;
    }
}
