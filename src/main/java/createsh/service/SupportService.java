package createsh.service;

import createsh.dao.SupportDao;
import createsh.pojo.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by darlingtld on 2015/6/24 0024.
 */
@Service
public class SupportService {

    @Autowired
    private SupportDao supportDao;


    @Transactional
    public void saveFeedback(Feedback feedback) {
        supportDao.saveFeedback(feedback);
    }
}
