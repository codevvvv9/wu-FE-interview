package main

import (
	"fmt"
	"go-1010/testpackage"
	"strconv"
)

func main() {
	fmt.Println("测试包的使用：")
	fmt.Println(testpackage.A)
	fmt.Println(testpackage.B)
	fmt.Println("=======")
	var a uint = 123 //正整形，默认会是uint64
	fmt.Println(a)
	fmt.Printf("%T", a)
	fmt.Println()
	fmt.Println("=======")
	var b int = 123 //整形，默认会是int64
	fmt.Println(b)
	fmt.Printf("%T", b)
	fmt.Println()
	fmt.Println("=======")
	var c uint8 = 255 //8位正整形 2^8 = 256, 0-255范围
	fmt.Println(c)
	fmt.Printf("%T", c)
	fmt.Println()
	fmt.Println("字符串转化为int")
	var str string = "1234"
	fmt.Printf("%T, %v", str, str) //格式化输出
	fmt.Println()
	strToInt, _ := strconv.Atoi(str)
	fmt.Printf("%T, %v", strToInt, strToInt) //格式化输出
	fmt.Println()
	fmt.Println("字符串转化为int64")
	strToInt64, _ := strconv.ParseInt(str, 10, 64)
	fmt.Printf("%T, %v", strToInt64, strToInt64) //格式化输出
	fmt.Println()
	fmt.Println("int转换成string")
	intToStr := strconv.Itoa(b)
	fmt.Printf("%T, %v", intToStr, intToStr) //格式化输出
	fmt.Println()
	fmt.Println("int64转换成string")
	var ccc int64 = 123
	int64ToStr := strconv.FormatInt(ccc, 10)
	fmt.Printf("%T, %v", int64ToStr, int64ToStr) //格式化输出
	fmt.Println()
	fmt.Println("字符串转换到float32/float64")
	var str11 string = "123"
	strToFloat32, _ := strconv.ParseFloat(str11, 32)
	strToFloat64, _ := strconv.ParseFloat(str11, 64)
	fmt.Printf("%T, %v\n", strToFloat32, strToFloat32) //格式化输出
	fmt.Printf("%T, %v\n", strToFloat64, strToFloat64) //格式化输出
	fmt.Println()
	fmt.Println("int64转int")
	//var i64 int64 = 213
	//int := int(i64)
	//fmt.Printf("%T, %v\n", int, int)
	fmt.Println("int转int64")
	var demo int = 123
	demoToInt64 := int64(demo)
	fmt.Printf("%T, %v\n", demoToInt64, demoToInt64)
}
