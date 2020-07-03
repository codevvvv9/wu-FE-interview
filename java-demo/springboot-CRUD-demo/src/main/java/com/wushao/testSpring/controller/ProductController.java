package com.wushao.testSpring.controller;

import com.wushao.testSpring.entity.Product;
import com.wushao.testSpring.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/products")
public class ProductController {
    @Autowired
    ProductService productService;

    @GetMapping(value = "", produces = {"application/json;charset=UTF-8"})
    public List<Product> getAllProducts() {
        return productService.listProduct();
    }
}
