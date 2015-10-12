package createsh.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * Created by tangl9 on 2015-10-12.
 */
@Entity
@Table(name = "trade_stat")
public class TradeStat {
    @Id
    private int id;
    @Column(name = "openid")
    private String openid;
    @Column(name = "transaction")
    private String transaction;
    @Column(name = "amount")
    private double amount;
    @Column(name = "orderid")
    private int orderid;
    @Column(name = "timestamp")
    private Date timestamp;

    public TradeStat(String openid, String transaction, int orderid, double amount) {
        this.openid = openid;
        this.transaction = transaction;
        this.orderid = orderid;
        this.amount = amount;
        this.timestamp = new Date();
    }

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    @Override
    public String toString() {
        return "TradeStat{" +
                "id=" + id +
                ", openid='" + openid + '\'' +
                ", transaction='" + transaction + '\'' +
                ", amount=" + amount +
                ", orderid=" + orderid +
                ", timestamp=" + timestamp +
                '}';
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

    public String getTransaction() {
        return transaction;
    }

    public void setTransaction(String transaction) {
        this.transaction = transaction;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
