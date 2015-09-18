package createsh.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Created by darlingtld on 2015/7/25 0025.
 */
public class Utils {

    private static final Logger logger = LoggerFactory.getLogger(Utils.class);

    public static double formatDouble(double value, int scale) {
        BigDecimal b = new BigDecimal(value);
        double fValue = b.setScale(scale, BigDecimal.ROUND_HALF_UP).doubleValue();
        return fValue;
    }

    public static Date yyyyMMddHHmmssParse(String date) {
        try {
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String chineseDateFormat(Date startTime) {
        return new SimpleDateFormat("yyyy年MM月dd日").format(startTime);
    }

    public static String yyyyMMddHHmmssFormat(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
    }

    public static String getWebInfoPath() {
        String os = System.getenv("OS");
        String prefix = "";
        if (!os.toLowerCase().contains("windows")) {
            prefix = "/";
        }
        return prefix + PathUtil.getWebInfPath();
    }

    public static void savePicture(MultipartFile pic, String dstFilePath) {
        if (pic != null) {
            File picFile = new File(dstFilePath);
            try {
                pic.transferTo(picFile);
                logger.info("Save file at {}", picFile);
            } catch (IllegalStateException | IOException e) {
                e.printStackTrace();
            }
        }
    }
}
