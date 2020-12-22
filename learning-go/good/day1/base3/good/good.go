package good

import (
	"fmt"
	"net/http"
)

// HandlerFunc good框架中定义的request handler,定义路由映射
type HandlerFunc func(http.ResponseWriter, *http.Request)

// Engine 实现ServeHTTP接口，里面有个路由表，key形如GET-/ ,value则是它对应的处理方法
type Engine struct {
	router map[string]HandlerFunc
}

//New good.Engine的构造函数
func New() *Engine {
	return &Engine{router: make(map[string]HandlerFunc)}
}

//addRoute 添加路由
func (engine *Engine) addRoute(method string, pattern string, handler HandlerFunc) {
	key := method + "-" + pattern
	engine.router[key] = handler
}

//GET GET请求
func (engine *Engine) GET(pattern string, handler HandlerFunc) {
	engine.addRoute("GET", pattern, handler)
}

//POST POST请求
func (engine *Engine) POST(pattern string, handler HandlerFunc) {
	engine.addRoute("POST", pattern, handler)
}

//Run 启动一个server
func (engine *Engine) Run(addr string) (err error) {
	//这个engine必须实现ServeHTTP法法
	return http.ListenAndServe(addr, engine)
}

func (engine *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	key := req.Method + "-" + req.URL.Path
	handler, ok := engine.router[key];
	if ok {
		handler(w, req)
	} else {
		fmt.Fprintf(w, "404 Not Found: %s\n", req.URL)
	}
}
