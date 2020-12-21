package good

import (
	"net/http"
)

// HandlerFunc good框架中定义的request handler
type HandlerFunc func(http.ResponseWriter, *http.Request)

// Engine 实现ServeHTTP接口
type Engine struct {
	router map[string]HandlerFunc
}

//New good.Engine的构造函数
func New() *Engine {
	return &Engine{router: make(map[string]HandlerFunc)}
}
