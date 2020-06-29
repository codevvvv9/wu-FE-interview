package com.wushao.testSpring.dao;

import com.wushao.testSpring.entity.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserDao {
    @Select("select * from test_spring.user;")
    List<User> findAll();

   User findOneById(@Param("id") Integer id);
}
