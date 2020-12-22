package main

import (
	"fmt"
)

func main() {
	var mapDemo map[string]string
	mapDemo = map[string]string{
		"a": "我是a",
	}
	value, ok := mapDemo["b"] //ok的值将会是false，表示mapDemo这个map中没有b这个key
	fmt.Printf("value is: %v\n", value)
	fmt.Printf("ok is: %v\n", ok)
}
