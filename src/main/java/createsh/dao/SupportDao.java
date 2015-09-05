package createsh.dao;

import createsh.pojo.Feedback;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by darlingtld on 2015/5/16.
 */
@Repository
public class SupportDao {

    @Autowired
    private SessionFactory sessionFactory;

    public void saveFeedback(Feedback feedback){
        sessionFactory.getCurrentSession().save(feedback);
    }
}
