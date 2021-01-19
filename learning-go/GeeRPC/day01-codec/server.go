package geerpc

import (
	"encoding/json"
	"fmt"
	"geerpc/day01-codec/codec"
	"io"
	"log"
	"net"
	"reflect"
	"sync"
)

//MagicNumber MagicNumber
const MagicNumber = 0x3bef5c

//Option 消息的编码方式
type Option struct {
	MagicNumber int
	CodecType   codec.Type
}

//DefaultOption 默认编码方式
var DefaultOption = &Option{
	MagicNumber: MagicNumber,
	CodecType:   codec.GobType,
}

//Server 代表RPC服务器
type Server struct{}

//NewServer 返回一个新的server
func NewServer() *Server {
	return &Server{}
}

//DefaultServer *Server的默认实例
var DefaultServer = NewServer()

//Accept 接收listener上的连接，并且对每个传入的连接提供请求
func (server *Server) Accept(lis net.Listener) {
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
func Accept(lis net.Listener) {
	DefaultServer.Accept(lis)
}

//ServerConn 单连接上运行服务器
//ServerConn 阻塞，为连接提供服务直到客户端挂断为止
func (server *Server) ServerConn(conn io.ReadWriteCloser) {
	defer func() { _ = conn.Close() }()
	var opt Option
	if err := json.NewDecoder(conn).Decode(&opt); err != nil {
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

	server.serverCodec(f(conn))
}

var invalidRequest = struct{}{}

//serverCodec serverCodec
func (server *Server) serverCodec(cc codec.Codec) {
	sending := new(sync.Mutex) //确保发送一个完整的响应了
	wg := new(sync.WaitGroup) //等待指导所有的请求被处理了
	for {
		req, err := server.readRequest(cc)
		if err != nil {
			if req == nil {
				break //这种事情不可能被恢复，因此关闭连接
			}
			//TODO 处理错误
			req.h.Error = err.Error()
			server.sendResponse(cc, req.h, invalidRequest, sending)
			continue
		}

		wg.Add(1)
		go server.handleRequest(cc, req, sending, wg)
	}

	wg.Wait()
	_ = cc.Close()

}

//request 存储了所有呼叫的信息
type request struct {
	h            *codec.Header
	argv, replyv reflect.Value
}

func (server *Server) readRequestHeader(cc codec.Codec) (*codec.Header, error) {
	var h codec.Header
	if err := cc.ReadHeader(&h); err != nil {
		if err != io.EOF && err != io.ErrUnexpectedEOF {
			log.Println("rpc server: read header error:", err)
		}
		return nil, err
	}

	return &h, nil
}

func (server *Server) readRequest(cc codec.Codec) (*request, error) {
	h, err := server.readRequestHeader(cc)
	if err != nil {
		return nil, err
	}

	req := &request{h: h}
	//假设请求列表的argv类型是字符串
	req.argv = reflect.New(reflect.TypeOf(""))
	if err = cc.ReadBody(req.argv.Interface()); err != nil {
		log.Println("rpc server: read argv err:", err)
		return nil, err
	}

	return req, nil
}

func (server *Server) sendResponse(cc codec.Codec, h *codec.Header, body interface{}, sending *sync.Mutex) {
	sending.Lock()
	defer sending.Unlock()
	if err := cc.Write(h, body); err != nil {
		log.Println("rpc server: write response error:", err)
	}
}

func (server *Server) handleRequest(cc codec.Codec, req *request, sending *sync.Mutex, wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println(req.h, req.argv.Elem())
	req.replyv = reflect.ValueOf(fmt.Sprintf("geerpc resp %d", req.h.Seq))
	server.sendResponse(cc, req.h, req.replyv.Interface(), sending)
}
