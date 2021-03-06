package createsh.util;


import java.io.IOException;
import java.util.Properties;

/**
 * Created by tangld on 2015/3/30.
 */
public class PropertyHolder {
    private static Properties prop = new Properties();

    static {
        try {
            prop.load(PropertyHolder.class.getClassLoader().getResourceAsStream("createsh.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static final String HEADER_MSG = "message";

    public static final String TOKEN = prop.getProperty("wechat.token");
    public static final String APPID = prop.getProperty("wechat.app_id");
    public static final String APPSECRET = prop.getProperty("wechat.app_secret");
    public static final String SERVER = prop.getProperty("wechat.server");

    public static final String MENU_SHOPPING_MALL="购物专区";
    public static final String MENU_GO_ORDER = "我要下单";
    public static final String MENU_MY_ORDER = "我的订单";
    public static final String MENU_MY_ACCOUNT = "我的账户";

    public static final String MENU_BRAND_CULTURE = "品牌文化";
    public static final String MENU_COOPERATION_INFO = "合作信息";
    public static final String MENU_LIANGYUAN_ENCYCLO = "梁源百科";
    public static final String MENU_HEALTH_DIET = "健康饮食";

    public static final String MENU_POST_SALE_SERVICE = "售后服务";
    public static final String MENU_FEEDBACK = "问题反馈";
    public static final String MENU_CONSIGNEE_INFO = "收货信息";
    public static final String MENU_POST_SALE_RULE = "退换条例";
    public static final String MENU_SHOP_INFO = "商户信息";
    public static final String MENU_ONLINE_CS = "在线客服";

}
