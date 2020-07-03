package com.wushao.testSpring.controller;

import com.wushao.testSpring.entity.User;
import com.wushao.testSpring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

//    @GetMapping(value = "/{id}", produces = {"application/json;charset=UTF-8"})
//    public User getUser(@PathVariable("id") Integer id) {
//        return userService.getUserById(id);
//    }
    @GetMapping(value = "/getId", produces = {"application/json;charset=UTF-8"})
    public User getUser(@RequestParam Integer id) {
        return userService.getUserById(id);
    }
    @PutMapping(value = "/update", produces = {"application/json;charset=UTF-8"})
    public int updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }
    @DeleteMapping(value = "")
    public int deleteUserById(@RequestParam Integer id) {
        return userService.deleteUserById(id);
    }
    @PostMapping(value = "")
    public int addUser(@RequestBody User user) {
        return userService.addUser(user);
    }
}
