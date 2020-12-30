## 准备工作
### 1. 拉取镜像
`docker pull golang:alpine` 
可以在[hub](https://hub.docker.com/_/golang?tab=tags&page=1&ordering=last_updated)上先查询镜像tags
### 2. 查看本地镜像
`docker images`

### 3.搜索远程镜像 
`docker search 镜像名字`
## 实战Docker
### 1. 编译Dockerfile
```go
# 基础镜像
FROM golang:alpine

# 设置go mod proxy 国内代理
# 设置golang path
ENV GOPROXY=https://goproxy.cn,https://goproxy.io,direct \
    GO111MODULE=on \
    CGO_ENABLED=1
#WORKDIR /ginvue
WORKDIR /ginvue
RUN go env -w GOPROXY=https://goproxy.cn,https://goproxy.io,direct
COPY . .
RUN go env && go list && go build -o app main.go

# 对外暴露的宿主机端口，可写可不写
EXPOSE 8888
ENTRYPOINT /ginvue/app

# 根据Dockerfile生成Docker镜像
# docker build -t ginvue .
# 根据Docker镜像启动Docker容器
# docker run -itd -p 8888:8888 --name ginvue ginvue

```

### 2. 编译生成容器
`docker build -t rcgserver:12301709 .`

上面就是编译生成容器，使用的容器名字叫`rcgserver`，版本号`12301709`

### 3. 创建一个新的容器并运行一个命令
`docker run -p 8890:8889  -d  rcgserver:12301709`
上述命令中：
- 8890含义：主机（宿主机）端口是8890，也就是暴露给用户的端口
- 8889含义：容器端口号，也就是你代码里面写的端口，用户无感知，通过上面的主机端口做了映射。
- rcgserver:12301709含义：`镜像名字:版本号`
### 4. 停止正在运行的容器
`docker stop 容器的名字`或者`docker kill 容器的名字`
### 5. 重启被停止的容器
` docker restart 容器的名字`
### 6. 查看正在运行的容器信息
`docker ps`

### 7. 删除容器
删除容器是删除镜像的前提，由此引出两者之间的关系：容器是镜像使用时的状态，对于运行的镜像来说都有一个使用状态，这就是容器，某个镜像被容器使用着。
`docker rm 容器名字`
当把所有停着的使用镜像的容器都删除之后才能删除这个镜像
`docker rmi 镜像名字`

