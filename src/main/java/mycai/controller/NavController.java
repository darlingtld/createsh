package mycai.controller;

import mycai.pojo.Product;
import mycai.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/nav")
public class NavController {

    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/zuixincaipin/{limit}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getLatest(@PathVariable("limit") int limit) {
        return productService.getLatest(limit);
    }

    @RequestMapping(value = "/zhekoucaipin/{limit}", method = RequestMethod.GET)
    public
    @ResponseBody
    List<Product> getOnsale(@PathVariable("limit") int limit) {
        return productService.getOnsaleList(limit);
    }
}