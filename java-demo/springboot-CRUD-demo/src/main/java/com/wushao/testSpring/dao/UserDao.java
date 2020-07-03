package com.wushao.testSpring.dao;

import com.wushao.testSpring.entity.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Service
//不推荐使用，只能在service用
//专给dao层用
@Repository
public interface UserDao {
    @Select("select * from test_spring.user;")
    List<User> findAll();

    //    User findOneById(@Param("id") Integer id);
    User findOneById(Integer id);

    int updateUser(@Param("user") User user);

    int deleteUserById(@Param("id") Integer id);

    int addUser(@Param("user") User user);
}
