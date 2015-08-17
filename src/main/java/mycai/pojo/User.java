package mycai.pojo;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

/**
 * Created by darlingtld on 2015/6/24 0024.
 */
@Entity
@Table(name = "user")
public class User {

    /**
     * {
     * "openid":" OPENID",
     * " nickname": NICKNAME,
     * "sex":"1",
     * "province":"PROVINCE"
     * "city":"CITY",
     * "country":"COUNTRY",
     * "headimgurl":    "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
     * "privilege":[
     * "PRIVILEGE1"
     * "PRIVILEGE2"
     * ],
     * "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
     * }
     */

    @Id
    private int id;
    @Column(name = "wechat_id", columnDefinition = "varchar(255) default 0")
    private String openid;
    @Column(name = "nickname")
    private String nickname;
    //    @Column(name = "username")
//    private String username;
    @Column(name = "role")
    private String role;
    @Transient
    private String sex;
    @Transient
    private String province;
    @Transient
    private String city;
    @Transient
    private String country;
    @Column(name = "headimgurl")
    private String headimgurl;
    @Transient
    private List<String> privilege;
    @Transient
    private String unionid;
    @Column(name = "consignee")
    private String consignee;
    @Column(name = "consignee_contact")
    private String consigneeContact;
    @Column(name = "shop_info")
    private String shopInfo;
    @Column(name = "shop_address")
    private String shopAddress;
//    @Column(name = "email")
//    private String email;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", openid='" + openid + '\'' +
                ", nickname='" + nickname + '\'' +
                ", role='" + role + '\'' +
                ", sex='" + sex + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country + '\'' +
                ", headimgurl='" + headimgurl + '\'' +
                ", privilege=" + privilege +
                ", unionid='" + unionid + '\'' +
                ", consignee='" + consignee + '\'' +
                ", consigneeContact='" + consigneeContact + '\'' +
                ", shopInfo='" + shopInfo + '\'' +
                ", shopAddress='" + shopAddress + '\'' +
                '}';
    }

    public String getShopAddress() {
        return shopAddress;
    }

    public void setShopAddress(String shopAddress) {
        this.shopAddress = shopAddress;
    }

//    @Column(name = "mobile")
//    private String mobile;

    //    public String getMobile() {
//        return mobile;
//    }
//
//    public void setMobile(String mobile) {
//        this.mobile = mobile;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }

    public String getShopInfo() {
        return shopInfo;
    }

    public void setShopInfo(String shopInfo) {
        this.shopInfo = shopInfo;
    }

    public String getConsigneeContact() {
        return consigneeContact;
    }

    public void setConsigneeContact(String consigneeContact) {
        this.consigneeContact = consigneeContact;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getHeadimgurl() {
        return headimgurl;
    }

    public void setHeadimgurl(String headimgurl) {
        this.headimgurl = headimgurl;
    }

    public List<String> getPrivilege() {
        return privilege;
    }

    public void setPrivilege(List<String> privilege) {
        this.privilege = privilege;
    }

    public String getUnionid() {
        return unionid;
    }

    public void setUnionid(String unionid) {
        this.unionid = unionid;
    }

}
