package createsh.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import createsh.excel.ExcelFactory;
import createsh.pojo.*;
import createsh.service.ProductService;
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
}