package com.wushao.testSpring.controller;

import com.wushao.testSpring.entity.User;
import com.wushao.testSpring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping(value = "users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(value = "", produces = {"application/json;charset=UTF-8"})
    public List<User> getAllUser() {
        return userService.listUser();
    }

    @GetMapping(value = "/{id}", produces = {"application/json;charset=UTF-8"})
    public User getUser(@PathVariable("id") Integer id) {
        return userService.getUserById(id);
    }
}
