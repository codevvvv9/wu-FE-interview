package main

import (
	"net/http"

	"github.com/gin-gonic/gin")


func main() {
	//创建默认路由引擎
	r := gin.Default()
	r.LoadHTMLGlob("templates/**/*")
	r.GET("/posts/index", func (c *gin.Context)  {
		// c.JSON(200, gin.H{
		// 	"message": "GET!!! Life is short, let's GO :)",
		// })
		c.HTML(http.StatusOK, "posts/index.html", gin.H{
			"title": "posts/index2",
		})
	})

	r.Run(":8081")
}