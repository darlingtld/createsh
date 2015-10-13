package createsh.dao;

import com.alibaba.fastjson.JSONObject;
import createsh.pojo.TradeStat;
import createsh.pojo.Transaction;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.Calendar;
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

    public JSONObject getTotalTransactionStat() {
        JSONObject jsonObject = new JSONObject();
        Calendar currentDate = Calendar.getInstance();

        currentDate.set(Calendar.HOUR_OF_DAY, 0);
        currentDate.set(Calendar.MINUTE, 0);
        currentDate.set(Calendar.SECOND, 0);

        String today = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(currentDate.getTime());


        Session session = sessionFactory.getCurrentSession();
        List<Object[]> result1 = session.createSQLQuery(String.format("select sum(amount), count(*) from trade_stat where transaction='%s' and timestamp >= '%s' union select sum(amount), count(*) from trade_stat where transaction='%s' and timestamp >= '%s'", Transaction.EXPENSE, today, Transaction.DEPOSIT, today)).list();
        jsonObject.put("salesVolume", result1.get(0)[0]);
        jsonObject.put("totalOrders", result1.get(0)[1]);
        jsonObject.put("depositVolume", result1.get(1)[0]);

        List<Object[]> result2 = session.createSQLQuery(String.format("select sum(amount), count(*) from trade_stat where transaction='%s' union select sum(amount), count(*) from trade_stat where transaction='%s'", Transaction.EXPENSE, Transaction.DEPOSIT)).list();
        jsonObject.put("salesVolumeHistory", result2.get(0)[0]);
        jsonObject.put("totalOrdersHistory", result2.get(0)[1]);
        jsonObject.put("depositVolumeHistory", result2.get(1)[0]);
        return jsonObject;

    }

    public void deleteTradeStatByOrderId(int orderId) {
        sessionFactory.getCurrentSession().createQuery(String.format("delete TradeStat where orderid = %d", orderId)).executeUpdate();
    }
}
