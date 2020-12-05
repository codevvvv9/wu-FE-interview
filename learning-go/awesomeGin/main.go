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
	"net/http"
)

type Login struct {
	User     string `form: "user" json:"user" binding: "required"`
	Password string `form: "password" json:"password" binding: "required"`
}

func main() {
	r := gin.Default() //默认中间件开启，logger
	r.POST("/path", func(c *gin.Context) {
		password := c.PostForm("Password")
		user := c.PostForm("User")
		fmt.Println(password, user)
		var json Login
		err := c.ShouldBindJSON(&json)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		if json.User != "wushao" || json.Password != "123" {
			fmt.Println(json.User, json.Password)
			c.JSON(http.StatusUnauthorized, gin.H{
				"status": "unauthorized",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"msg": &json,
		})
	})
	r.Run(":1010") // 监听并在 0.0.0.0:8080 上启动服务
}
