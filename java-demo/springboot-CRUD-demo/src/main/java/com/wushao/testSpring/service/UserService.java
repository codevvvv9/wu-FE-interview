package com.wushao.testSpring.service;

import com.wushao.testSpring.entity.User;

import java.util.List;

public interface UserService {

    List<User> listUser();

    User getUserById(Integer id);

    int updateUser(User user);

    int deleteUserById(Integer id);

    int addUser(User user);
}
