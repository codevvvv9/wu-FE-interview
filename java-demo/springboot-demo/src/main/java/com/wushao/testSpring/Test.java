package com.wushao.testSpring;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
@Api(tags = "测试模块")
@RestController
public class Test {
    @ApiOperation(value = "获取")
//    @RequestMapping(value = "/test",method = RequestMethod.GET)
    @GetMapping(value = "/test")
    public String testSpring() {
        return "hello Spring 111";
    }
    @ApiOperation(value = "获取1")
    @GetMapping(value = "/test1")
    public String testSpring1() {
        return "hello Spring 111111";
    }
}
