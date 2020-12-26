package good

import "net/http"

//HandlerFunc good框架中定义的request handler,定义路由映射
type HandlerFunc func(*Context)

//Engine 实现ServerHttp接口的容器
type Engine struct {
	router *router
}

//ServeHTTP ServeHTTP是容器必须要实现的接口
func (e *Engine) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	c := newContext(w, req)
	e.router.handle(c)
}
//New good.Engine的构造函数
func New() *Engine {
	return &Engine{router: newRouter()}
}

func (e *Engine) addRoute(method string, pattern string, handler HandlerFunc) {
	e.router.addRoute(method, pattern, handler)
}

//GET GET
func (e *Engine) GET(pattern string, handler HandlerFunc) {
	e.addRoute("GET", pattern, handler)
}

//POST POST
func (e *Engine) POST(pattern string, handler HandlerFunc) {
	e.addRoute("POST", pattern, handler)
}

//Run Run
func (e *Engine) Run(addr string) (err error) {
	return http.ListenAndServe(addr, e)
}

