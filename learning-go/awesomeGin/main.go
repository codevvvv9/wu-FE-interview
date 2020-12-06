/**
 * @Author: wushaolin
 * @Author: wslsdust@163.com
 * @Date: 2020/12/5 11:16 下午
 * @Desc: gin POST方法的JSON模型绑定
 */
package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"net/http"
)

type Login struct {
	User string `json:"user" binding:"required,mustBig"`
	//binding必填，而且可以自定义表单校验器
	//这里的反引号之间的键值对不能加空格，注意规范
	Password string `json:"password" binding:"required"`
}

func mustBig(fl validator.FieldLevel) bool {
	fmt.Println(fl.FieldName())
	fmt.Println(fl.Field())
	if (fl.Field().Interface().(string)) != "123" {
		return false
	}
	return true
}

func main() {
	r := gin.Default() //默认中间件开启，logger

	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("mustBig", mustBig)
	}
	r.POST("/path", func(c *gin.Context) {
		var loginUser Login
		err := c.ShouldBindJSON(&loginUser) //结构体的取地址
		//err := c.ShouldBindQuery(&json)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if loginUser.User != "wushao" || loginUser.Password != "123" {
			c.JSON(http.StatusUnauthorized, gin.H{
				"status": "unauthorized",
			})
			return
		}
		fmt.Println("loginUser.User", loginUser.User)
		fmt.Println("loginUser.Password", loginUser.Password)
		c.JSON(http.StatusOK, gin.H{
			"msg": loginUser,
		})
	})
	r.Run(":1010") // 监听并在 0.0.0.0:8080 上启动服务
}
