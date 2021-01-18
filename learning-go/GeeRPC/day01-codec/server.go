package geerpc

import (
	"encoding/json"
	"geerpc/day01-codec/codec"
	"io"
	"log"
	"net"
)

//MagicNumber MagicNumber
const MagicNumber = 0x3bef5c

//Option 消息的编码方式
type Option struct {
	MagicNumber int
	CodecType codec.Type
}

//DefaultOption 默认编码方式
var DefaultOption = &Option{
	MagicNumber: MagicNumber,
	CodecType: codec.GobType,
}

//Server 代表RPC服务器
type Server struct {}

//NewServer 返回一个新的server
func NewServer() *Server {
	return &Server{}
}

//DefaultServer *Server的默认实例
var DefaultServer = NewServer()

//Accept 接收listener上的连接，并且对每个传入的连接提供请求
func (server *Server) Accept(lis net.Listener)  {
	for {
		conn, err := lis.Accept()
		if err != nil {
			log.Println("rpc server: accept error:", err)
			return 
		}
		go server.ServerConn(conn)
	}
}

//Accept Accept
func Accept(lis net.Listener)  {
	DefaultServer.Accept(lis)
}

//ServerConn 单连接上运行服务器
//ServerConn 阻塞，为连接提供服务直到客户端挂断为止
func (server *Server) ServerConn(conn io.ReadWriteCloser)  {
	defer func() { _ = conn.Close() }()
	var opt Option
	if err:= json.NewDecoder(conn).Decode(&opt); err != nil {
		log.Println("rpc server: options error: ", err)
		return
	}

	if opt.MagicNumber != MagicNumber {
		log.Printf("rpc server: invalid magic number %x", opt.MagicNumber)
		return
	}

	f := codec.NewCodecFuncMap[opt.CodecType]

	if f != nil {
		log.Printf("rpc server: invalid codec type %s", opt.CodecType)
		return
	}

	server.ServerCodec(f(conn))
}

var invalidRequest = struct{}{}

//ServerCodec ServerCodec
func (server *Server) ServerCodec(cc codec.Codec)  {
	
}