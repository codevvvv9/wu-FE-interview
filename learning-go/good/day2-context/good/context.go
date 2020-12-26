package good

import (
	"encoding/json"
	"fmt"
	"net/http"
)

//H 为map结构起一个别名good.H
type H map[string]interface{}

//Context 上下文
//包含： http.ResponseWriter *http.Request，提供对Method 和 Path常用属性的直接访问
// 提供访问Query 和 PostForm参数的方法
// 提供快速构造	String Data JSON HTML响应的方法
type Context struct {
	//origin objects
	Writer http.ResponseWriter
	Req    *http.Request
	//request info
	Path   string
	Method string
	//response info
	StatusCode int
}

func newContext(w http.ResponseWriter, req *http.Request) *Context {
	return &Context{
		Writer: w,
		Req:    req,
		Path:   req.URL.Path,
		Method: req.Method,
	}
}

//PostForm post方法的参数
func (c *Context) PostForm(key string) string {
	return c.Req.FormValue(key)
}

//Query get方法的参数
func (c *Context) Query(key string) string {
	return c.Req.URL.Query().Get(key)
}

//Status Status
func (c *Context) Status(code int) {
	c.StatusCode = code
	c.Writer.WriteHeader(code)
}

//SetHeader Set Header
func (c *Context) SetHeader(key string, value string) {
	c.Writer.Header().Set(key, value)
}

//String 处理字符串
func (c *Context) String(code int, format string, values ...interface{}) {
	c.SetHeader("Content-Type", "text/plain")
	c.Status(code)
	c.Writer.Write([]byte(fmt.Sprintf(format, values...)))
}

//JSON 处理JSON
func (c *Context) JSON(code int, obj interface{}) {
	c.SetHeader("Content-Type", "application/json")
	c.Status(code)
	encoder := json.NewEncoder(c.Writer)
	if err := encoder.Encode(obj); err != nil {
		http.Error(c.Writer, err.Error(), http.StatusInternalServerError)
	}
}

//Data 处理字节流
func (c *Context) Data(code int, data []byte) {
	c.Status(code)
	c.Writer.Write(data)
}

//HTML 处理HTML
func (c *Context) HTML(code int, html string) {
	c.SetHeader("content-type", "text/html; charset=utf-8")
	c.Status(code)
	c.Writer.Write([]byte(html))
}