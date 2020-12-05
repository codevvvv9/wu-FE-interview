/**
 * @Author: wushaolin
 * @Author: wslsdust@163.com
 * @Date: 2020/12/5 11:14 下午
 * @Desc: gin四个方法的简单使用
 */
package gin_demo

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default() //默认中间件开启，logger
	r.GET("/path/:id", func(c *gin.Context) {
		id := c.Param("id") //URI里面的参数
		user := c.DefaultQuery("user", "wushao")
		if user == "" {
			user = "default"
		}
		password := c.Query("password")
		c.JSON(200, gin.H{
			"id":       id,
			"user":     user,
			"password": password,
		})
	})
	r.POST("/path", func(c *gin.Context) {
		user := c.DefaultPostForm("user", "wushao")
		password := c.PostForm("password")
		c.JSON(200, gin.H{
			"user":     user,
			"password": password,
		})
	})
	r.DELETE("/path/:id", func(c *gin.Context) {
		id := c.Param("id")
		c.JSON(200, gin.H{
			"id": id,
		})
	})
	r.PUT("/path", func(c *gin.Context) {
		user := c.DefaultPostForm("user", "wushao")
		password := c.PostForm("password")
		c.JSON(200, gin.H{
			"user":     user,
			"password": password,
		})
	})
	r.Run(":1010") // 监听并在 0.0.0.0:8080 上启动服务
}
