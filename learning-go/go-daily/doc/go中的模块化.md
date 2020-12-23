## go中的module
go代码结构使用module+package的形式来组织代码
每个go文件，必须包含在package中，1.13版本后使用go mod的形式来组织代码

### 在GOPATH目录
直接项目根目录go mode init，生成如下的go.mod
```go
//假设GOPATH目录/src/code下开发
module code/vscodedemo

go 1.15
```

那么如果你新建了一个目录，在`packge demo`下

在其他go文件中引用，直接`import "code/vscodedemo/demo"`

### 在GOPATH目录之外
需要在项目根目录go mod init 模块名字，其他引用和上面一样

### 每个目录都go mod
这种方式比较繁琐
根目录的go.mod中这么写:
```go
module demo/v1224

go 1.15

require demo v0.0.1 
replace demo => ./demo
```
demo这个目录下的go.mod这么写：
```go
module demo

go 1.15
```
引用是直接`import "demo"`
