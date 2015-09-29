package createsh.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import createsh.excel.ExcelFactory;
import createsh.pojo.*;
import createsh.service.ProductService;
import createsh.util.PropertyHolder;
import createsh.util.Utils;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.Serializable;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/material")
public class MaterialController {

    private static final Logger logger = LoggerFactory.getLogger(MaterialController.class);
    private String ABOUT_JPG = "about.jpg";
    private String COOK_TRICKS_JPG = "cook-tricks.jpg";
    private String DAOGU_KNOWLEDGE_JPG = "daogu-knowledge.jpg";

    @RequestMapping(value = "/picture/upload", method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject uploadPicture(@RequestParam(value = "pic", required = false) MultipartFile pic, HttpServletResponse response) {
        if (pic == null) {
            return null;
        }
        String dstFilePath = Utils.getWebInfoPath() + "/images/";

        System.out.println("dstFilePath =" + dstFilePath);

        if (pic != null) {
            String picLoc = "pic" + System.currentTimeMillis() + pic.getOriginalFilename().hashCode() + ".jpg";
            String filePath = dstFilePath + picLoc;
            Utils.savePicture(pic, filePath);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("picLoc", "images/" + picLoc);
            return jsonObject;
        }
        return null;
    }

    @RequestMapping(value = "/picture/list", method = RequestMethod.GET)
    public
    @ResponseBody
    JSONArray getPictureList() {
        String srcFilePath = Utils.getWebInfoPath() + "/images/";

        System.out.println("srcFilePath = " + srcFilePath);

        JSONArray jsonArray = new JSONArray();
        File picDir = new File(srcFilePath);
        for (File picFile : picDir.listFiles()) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("picLoc", picFile.getParentFile().getName() + "/" + picFile.getName());
            jsonObject.put("usage", "<img src='" + picFile.getParentFile().getName() + "/" + picFile.getName() + "'>");
            jsonArray.add(jsonObject);
        }

        Collections.sort(jsonArray, new Comparator<Object>() {
            @Override
            public int compare(Object o1, Object o2) {
                JSONObject jo1 = (JSONObject) o1;
                JSONObject jo2 = (JSONObject) o2;
                return -jo1.getString("picLoc").compareTo(jo2.getString("picLoc"));
            }
        });


        return jsonArray;
    }

    @RequestMapping(value = "/picture/delete", method = RequestMethod.POST, headers = "Content-Type=application/json")
    public
    @ResponseBody
    void deletePicture(@RequestBody JSONObject jsonObject) {
        String filePath = Utils.getWebInfoPath() + jsonObject.get("picLoc");

        System.out.println("delete file path = " + filePath);

        File picFile = new File(filePath);

        picFile.delete();

    }

    @RequestMapping(value = "/content", method = RequestMethod.GET)
    public
    @ResponseBody
    JSONArray getMenuContentList() {
        JSONArray menuContentList = new JSONArray();
        JSONObject menuAboutLiangyuan = new JSONObject();
        menuAboutLiangyuan.put("title", PropertyHolder.MENU_ABOUT_LIANGYUAN);
        menuAboutLiangyuan.put("picLoc", ABOUT_JPG);
        menuContentList.add(menuAboutLiangyuan);
        JSONObject menuDaoguKnowledge = new JSONObject();
        menuDaoguKnowledge.put("title", PropertyHolder.MENU_RICE_KNOWLEDGE);
        menuDaoguKnowledge.put("picLoc", DAOGU_KNOWLEDGE_JPG);
        menuContentList.add(menuDaoguKnowledge);
        JSONObject menuCookTricks = new JSONObject();
        menuCookTricks.put("title", PropertyHolder.MENU_COOK_TRICKS);
        menuCookTricks.put("picLoc", COOK_TRICKS_JPG);
        menuContentList.add(menuCookTricks);
        return menuContentList;

    }

    @RequestMapping(value = "/content/switch", method = RequestMethod.POST)
    public
    @ResponseBody
    JSONObject switchContentPicture(@RequestParam(value = "pic") MultipartFile pic, @RequestParam("menu") String menu, HttpServletResponse response) {
        if (pic == null) {
            return null;
        }
        String dstFilePath = Utils.getWebInfoPath() + "/images/";

        System.out.println("dstFilePath =" + dstFilePath);

        if (pic != null) {
            String picLoc = null;
            switch (menu) {
                case PropertyHolder.MENU_ABOUT_LIANGYUAN:
                    picLoc = ABOUT_JPG;
                    break;
                case PropertyHolder.MENU_RICE_KNOWLEDGE:
                    picLoc = DAOGU_KNOWLEDGE_JPG;
                    break;
                case PropertyHolder.MENU_COOK_TRICKS:
                    picLoc = COOK_TRICKS_JPG;
                    break;
            }
            if (picLoc == null) {
                return null;
            }
            String filePath = dstFilePath + picLoc;
            Utils.savePicture(pic, filePath);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("picLoc", "images/" + picLoc);
            return jsonObject;
        }
        return null;
    }
}