## 安装
设置国内镜像

## 安装mysql
docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
例如： `docker run --name mysql1 -e MYSQL_ROOT_PASSWORD=123456 -p 3306:3306 -d mysql:5.7.27`

## Docker常见命令

1. 查看所有镜像：`docker ps`
2. 杀掉某个镜像： `docker kill 镜像名字`
3. 重启杀掉的那个镜像：`docker container start 镜像名字`
4. 在启动的容器中执行命令： `docker exec -it 镜像名字 bash`，将会开启一个新的Linux系统，在这个系统里面运行那个镜像。

## 以mysql为例

1. 进入容器中后，`mysql -u root -p 回车输入密码`
2. 查看数据库列表：`show databases;`
3. 切换数据库： `use 你想切换的数据库的名字`
4. 查看当前数据库的所有表： `show tables;`

## mac查看本机Ip

`ifconfig | grep "inet " | grep -v 127.0.0.1`
