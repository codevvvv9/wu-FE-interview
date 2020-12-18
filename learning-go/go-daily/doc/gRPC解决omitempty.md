## omitempty问题
新版的gRPC配合proto3一起使用，不在支持required和optional操作，因此会默认序列化后的proto.go的结构体中添加上默认缺省为空的tag，但是有时间falsey值仍然是有效的数据，这时候不应该让其缺省，因此借助这个插件弥补这个缺陷。
[https://github.com/favadi/protoc-go-inject-tag](https://github.com/favadi/protoc-go-inject-tag)