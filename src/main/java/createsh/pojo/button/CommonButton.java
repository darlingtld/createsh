package createsh.pojo.button;

/**
 * Created by darlingtld on 2015/2/20.
 */

/**
 * ��ͨ��ť���Ӱ�ť��
 */
public class CommonButton extends Button {
    private String type;
    private String key;
    private String url;

    public String getType() {
        return type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
