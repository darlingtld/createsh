package mycai.pojo.button;

/**
 * Created by darlingtld on 2015/2/20.
 */

/**
 * 普通按钮（子按钮）
 */
public class CommonButton extends Button {
    private String type;
    private String key;

    public String getType() {
        return type;
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
