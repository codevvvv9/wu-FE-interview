## go中的map
可以通俗的理解成js中的对象，键值对，特别的一点是，对它取值可以有两个返回值，用以规避这个key到底存不存在于这个map中
他也是引用类型。

var mapDemo map[string]string
mapDemo = map[string]string{
  "a": "我是a",
} 
value, ok := mapDemo["b"] //ok的值将会是false，表示mapDemo这个map中没有b这个key