package createsh.dao;

import createsh.pojo.CSMessage;
import createsh.pojo.Feedback;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.List;

/**
 * Created by darlingtld on 2015/5/16.
 */
@Repository
public class SupportDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void saveFeedback(Feedback feedback) {
        sessionFactory.getCurrentSession().save(feedback);
    }

    public List<CSMessage> getCSMessageList() {
        Query query = sessionFactory.getCurrentSession().createQuery(String.format("from CSMessage where timestamp>:ts order by timestamp desc"));
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, -48);
        query.setTimestamp("ts", calendar.getTime());
        return query.list();
    }

    public void saveCSMessage(CSMessage csMessage) {
        sessionFactory.getCurrentSession().save(csMessage);
    }
}
