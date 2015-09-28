package createsh.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by apple on 15/9/28.
 */
@Entity
@Table(name = "cs_message")
public class CSMessage {
    @Id
    private int id;
    @Column(name="openid")
    private String openid;
    @Column(name = "message")
    private String message;
    @Column(name="timestamp")
    private Date timestamp;
    @Column(name = "headimgurl")
    private String headimgurl;
    @Column(name="nickname")

    private String nickname;

    @Override
    public String toString() {
        return "CSMessage{" +
                "id=" + id +
                ", openid='" + openid + '\'' +
                ", message='" + message + '\'' +
                ", timestamp=" + timestamp +
                ", headimgurl='" + headimgurl + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }



}
