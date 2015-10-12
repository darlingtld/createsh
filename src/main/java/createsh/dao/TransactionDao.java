package createsh.dao;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import createsh.pojo.TradeStat;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by tangl9 on 2015-10-12.
 */
@Repository
public class TransactionDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void recordTransaction(TradeStat tradeStat) {
        sessionFactory.getCurrentSession().save(tradeStat);
    }

    public List<TradeStat> getStat4User(String openid) {
        return sessionFactory.getCurrentSession().createQuery(String.format("from TradeStat where openid='%s' order by timestamp desc", openid)).list();
    }

    public void updateTradeStat(TradeStat tradeStat) {
        sessionFactory.getCurrentSession().createQuery(String.format("update TradeStat set amount=%s where orderid=%d", tradeStat.getAmount(), tradeStat.getOrderid())).executeUpdate();
    }
}
