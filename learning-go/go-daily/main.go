package main

import "fmt"

func main() {
	a := []int{1, 2, 3, 4}
	b := a[:2]
	fmt.Println("cap(b)", cap(b))
	c := a[2:]
	b = append(b, 5)
	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(c)

}
