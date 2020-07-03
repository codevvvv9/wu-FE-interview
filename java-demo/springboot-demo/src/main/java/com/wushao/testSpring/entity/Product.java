package com.wushao.testSpring.entity;

import lombok.Data;

@Data
public class Product {
    private Integer id;
    private String product;
    private String origin;
    private Integer number;
}
