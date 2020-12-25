// package main

// import (
// 	"fmt"
// )

// func main() {
// 	var mapDemo map[string]string
// 	mapDemo = map[string]string{
// 		"a": "我是a",
// 	}
// 	value, ok := mapDemo["b"] //ok的值将会是false，表示mapDemo这个map中没有b这个key
// 	fmt.Printf("value is: %v\n", value)
// 	fmt.Printf("ok is: %v\n", ok)
// }

package main

import "fmt"

func main() {

	a := []int{1, 2, 3}
	fmt.Printf("未进sliceadda地址： %p\n", &a)
	sliceadd(a)
	fmt.Printf("进sliceadda地址： %p\n", &a)
	fmt.Println(a)

	sliceadd2(&a)
	fmt.Printf("进sliceadd2后地址： %p\n", &a)
	fmt.Println(a)
}
func sliceadd(s []int) {
	fmt.Printf("s刚进来未append时：%p\n", &s)
	s[0]=100
	s = append(s, 0, 11, 22, 33, 44)
	s[0]=111

	fmt.Printf("sliceadd中append后%p\n", &s)

}

func sliceadd2(s *[]int) {
	*s = append(*s, 0, 11, 22, 33, 44)
}
