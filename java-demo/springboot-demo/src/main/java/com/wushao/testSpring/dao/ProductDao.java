package com.wushao.testSpring.dao;

import com.wushao.testSpring.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface ProductDao {
    List<Product> findAllProduct();
}
