package main

import (
	"good/day2-context/good"
	"net/http"
)

func main() {
	r := good.New()

	r.GET("/", func(c *good.Context) {
		c.HTML(http.StatusOK, "<h1>Hello, Good</h1>")
	})

	r.GET("/hello", func(c *good.Context) {
		// 形如/hello?name=wushao
		c.String(http.StatusOK, "hello %s, you're at %s\n", c.Query("name"), c.Path)
	})

	r.POST("/login", func(c *good.Context) {
		c.JSON(http.StatusOK, good.H{
			"username": c.PostForm("username"),
			"password": c.PostForm("password"),
		})
	})
	r.Run(":9999")
}
