package createsh.service;

import com.alibaba.fastjson.JSONObject;
import createsh.dao.TransactionDao;
import createsh.pojo.TradeStat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by tangl9 on 2015-10-12.
 */
@Service
public class TransactionService {

    @Autowired
    private TransactionDao transactionDao;

    @Transactional
    public void recordTransaction(TradeStat tradeStat) {
        transactionDao.recordTransaction(tradeStat);
    }

    @Transactional
    public List<TradeStat> getStat4User(String openid) {
        return transactionDao.getStat4User(openid);
    }

    @Transactional
    public void updateTransaction(TradeStat tradeStat) {
        transactionDao.updateTradeStat(tradeStat);
    }

    @Transactional
    public JSONObject getTotalTransactionStat() {
        return transactionDao.getTotalTransactionStat();
    }
}
