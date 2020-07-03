package com.wushao.testSpring.service.impl;

import com.wushao.testSpring.dao.ProductDao;
import com.wushao.testSpring.entity.Product;
import com.wushao.testSpring.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductDao productDao;
    public List<Product> listProduct() {
        return productDao.findAllProduct();
    }
}
