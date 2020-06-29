package com.wushao.testSpring.service.impl;

import com.wushao.testSpring.dao.UserDao;
import com.wushao.testSpring.entity.User;
import com.wushao.testSpring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;

    public List<User> listUser() {
        return userDao.findAll();
    }
    public User getUserById(Integer id) {
        return userDao.findOneById(id);
    }
}
