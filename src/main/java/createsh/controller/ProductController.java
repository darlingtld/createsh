package createsh.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import createsh.excel.ExcelFactory;
import createsh.pojo.*;
import createsh.service.ProductService;
import createsh.util.PathUtil;
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
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/product")
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/category/{category}/wechatid/{wechatid}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getList(@PathVariable("category") String category, @PathVariable("wechatid") String wechatid) {
//        return productService.getListByFavourites(category, wechatid);
        return productService.getList(category);
    }

    @RequestMapping(value = "/itemid/{itemid}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getProductById(@PathVariable("itemid") int itemId) {
        return Lists.newArrayList(productService.getById(itemId));
    }

    @RequestMapping(value = "/category/{category}/pinyin/asc", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getListByPy(@PathVariable("category") String category) {
        return productService.getListSortByPinyin(category, "name", "asc");
    }

    @RequestMapping(value = "/admin/category/{category}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getList4Admin(@PathVariable("category") String category) {
        return productService.getList(category);
    }

    @RequestMapping(value = "/zuixincaipin/{limit}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getLatest(@PathVariable("limit") int limit) {
        return productService.getLatest(limit);
    }

    @RequestMapping(value = "/most_bought/{type}/wechatid/{wechatid}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getMostBought(@PathVariable("type") String type, @PathVariable("wechatid") String wechatid) {
        return productService.getMostBought(wechatid, type);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getAll() {
        return productService.getAll();
    }

    @RequestMapping(value = "/procurement/all", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Procurement> getProcurement() {
        return productService.getProcurement();
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST, headers = "Content-Type=application/json")
    public
    @ResponseBody
    void create(@RequestBody Product product) {
        productService.save(product);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST, headers = "Content-Type=application/json")
    public
    @ResponseBody
    void update(@RequestBody Product product) {
        productService.update(product);
    }

    @RequestMapping(value = "/delete/{product_id}", method = RequestMethod.POST)
    public
    @ResponseBody
    void delete(@PathVariable("product_id") int productId) {
        productService.delete(productId);
    }

    @RequestMapping(value = "/type_map", method = RequestMethod.GET)
    public
    @ResponseBody
    JSONArray getTypeMap() {
        JSONArray jsonArray = new JSONArray();
        Map<Type, List<Category>> typeMap = productService.getTypeMap();
        for (Type key : typeMap.keySet()) {
            List<Category> categoryList = typeMap.get(key);
            JSONArray categoryJsonArray = new JSONArray();
            for (Category category : categoryList) {
                JSONObject jsonObject = new JSONObject();
                jsonObject.put("key", category.getCategory());
                jsonObject.put("value", category.toString());
                categoryJsonArray.add(jsonObject);
            }
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("name", key.getType());
            jsonObject.put("value", key.toString());
            jsonObject.put("list", categoryJsonArray);
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    @RequestMapping("/export")
    public ResponseEntity<byte[]> download() throws IOException {
        String fileName = String.format("商品列表%s.xlsx", new SimpleDateFormat("yyyyMMdd").format(new Date()));
        ExcelFactory.exportProducts(fileName, productService.getAll(), productService.getTypeMap(), productService.getProcurement());
        File file = new File(fileName);
        HttpHeaders headers = new HttpHeaders();
        String cnfileName = new String(fileName.getBytes("UTF-8"), "iso-8859-1");
        headers.setContentDispositionFormData("attachment", cnfileName);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return new ResponseEntity<>(FileUtils.readFileToByteArray(file), headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public
    @ResponseBody
    void uploadProduct(@RequestParam(value = "pic", required = false) MultipartFile pic,
                       @RequestParam(value = "picZoom", required = false) MultipartFile picZoom,
                       @RequestParam(value = "id", required = false) Integer id,
                       @RequestParam("name") String name,
                       @RequestParam("description") String description,
                       @RequestParam("type") String type,
                       @RequestParam("category") String category,
                       @RequestParam("price") double price,
                       @RequestParam("unit") String unit,
                       HttpServletResponse response) {
        if (type == null || name == null || pic == null || description == null || category == null || price == 0 || unit == null) {
            response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
            return;
        }
        Product product;
        if (id != null) {
            product = productService.getById(id);
        } else {
            product = new Product();
        }
        product.setName(name);
        product.setDescription(description);
        product.setType(Type.valueOf(type));
        product.setCategory(Category.valueOf(category));
        product.setPrice(price);
        product.setUnit(unit);
        // for Linux
        String dstFilePath = "/" + PathUtil.getWebInfPath() + "/product_images/";
        // for Windows
//        String dstFilePath = PathUtil.getWebInfPath() + "/product_images/";
        System.out.println("dstFilePath =" + dstFilePath);

        if (pic != null) {
            String picLoc = product.generatePicurlHash() + ".jpg";
            String filePath = dstFilePath + picLoc;
            savePicture(pic, filePath);
            product.setPicurl("product_images/" + picLoc);
        }

        if (picZoom != null) {
            String picLoc = product.generatePicurlZoomHash() + ".jpg";
            String filePath = dstFilePath + picLoc;
            savePicture(picZoom, filePath);
            product.setPicurlZoom("product_images/" + picLoc);
        }
        product.setDataChangeLastTime(new Timestamp(System.currentTimeMillis()));
        if (id != null) {
            productService.update(product);
        } else {
            productService.save(product);
        }
    }

    private void savePicture(MultipartFile pic, String dstFilePath) {
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

    @RequestMapping(value = "/save_sort", method = RequestMethod.POST)
    public
    @ResponseBody
    void saveSort(@RequestBody List<ProductOrder> productOrderList) {
        System.out.println(productOrderList);
        productService.saveProductSortOrder(productOrderList);
    }

}