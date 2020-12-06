/**
 * @Author: wushaolin
 * @Author: wslsdust@163.com
 * @Date: 2020/12/6 8:47 下午
 * @Desc: 学习gorm基础-连接数据库、创建数据库表、表的增删改查
 */
package main

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

//gorm会把这面这个结构体映射成表hello_orms
type HelloOrm struct {
	gorm.Model
	Name   string
	Gender bool
	Age    int
}

func main() {
	//gorm连接mysql
	db, err := gorm.Open("mysql", "root:Root1234!@/ginclass?charset=utf8mb4&parseTime=True&loc=Local")
	//第一步异常判断
	if err != nil {
		panic(err)
	}
	//自动迁移数据库表，没有则创建，注意是取地址
	db.AutoMigrate(&HelloOrm{})
	//0. 增加/创建 一条数据库记录
	//db.Create(&HelloOrm{
	//	Name: "shaolin",
	//	Gender: true,
	//	Age: 29,
	//})
	// 1.查询 表操作
	// 1.1 查询表中默认的第一条数据
	var firstHello HelloOrm
	db.First(&firstHello)
	fmt.Println("查询表中默认的第一条数据: ", firstHello)
	// 1.2 查询 按条件
	var firstHelloByCondition HelloOrm
	//db.Where("name = ?", "wushaolin").First(&firstHelloByCondition)
	//等同于下面这种写法
	db.First(&firstHelloByCondition, "name = ?", "wushaolin")
	fmt.Println("查询 按条件: ", firstHelloByCondition)
	// 1.3 查询所有数据
	var allHello []HelloOrm //所有数据需要使用slice切片
	db.Find(&allHello)
	fmt.Println("表中所有数据：", allHello)
	fmt.Println("表中所有数据长度：", len(allHello))
	//1.3.1表中所有年龄小于18岁的人
	var allHelloByAge []HelloOrm
	db.Where("age < ?", 18).Or("age > ?", 28).Find(&allHelloByAge)
	fmt.Println("年龄小于18或者年龄大于28的数据：", allHelloByAge)
	//2. 更新 表操作
	//2.1 更新数据中的一个字段 按照什么条件在哪个表里面查询
	db.Where("id = ?", 1).First(&HelloOrm{}).Update("name", "我是id1")
	//2.2 更新数据中的多个字段，有两种方式
	//2.2.1 第一种结构体
	db.Where("id = ?", 2).First(&HelloOrm{}).Updates(HelloOrm{
		Name:   "我是id2",
		Gender: true,
	})
	//2.2.2 第二种map
	db.Where("id = ?", 3).First(&HelloOrm{}).Updates(map[string]interface{}{
		"Name": "我是id3",
	})
	//2.2.3批量更新多条数据
	db.Where("id in (?)", []int{4, 5, 6}).First(&[]HelloOrm{}).Updates(HelloOrm{
		Name: "我是id4,5,6",
	})
	//3. 删除 一条或多条表记录 默认是软删除
	//3.1 删除一条表记录，软删除
	db.Where("id = ?", "7").Delete(&HelloOrm{})
	//3.2 删除多条记录 软删除
	db.Where("id in (?)", []int{8, 9, 10}).Delete(&HelloOrm{})
	//3.3 删除一条记录 物理删除
	db.Where("id = ?", 10).Unscoped().Delete(&HelloOrm{})
	//永远记得异步关闭数据库
	defer db.Close()
}
