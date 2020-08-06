package main //声明main包，表明这是一个可执行程序
import "github.com/gin-gonic/gin"

func main() {
	//创建默认的路由引擎
	r := gin.Default()
	//GET: 请求方式； /hello: 请求路径
	//当客户端以GET方式请求/hello路径时，会执行后面的匿名函数
	r.GET("/hello", func(c *gin.Context) {
		//c.JSON: 返回JSON格式的数据
		c.JSON(200, gin.H{
			"message": "Hello world! Life is short, Let's GO :)",
		})
	})
	//启动HTTP服务，默认在127.0.0.1:8080/hello
	r.Run()
}
