package codec

import "io"

//Header Header
type Header struct {
	ServiceMethod string //format "Service.Method"
	Seq           uint64 // sequence number chosen by client
	Error         string
}

//Codec 对消息体进行编解码
type Codec interface {
	io.Closer
	ReadHeader(*Header) error
	ReadBody(interface{}) error
	Write(*Header, interface{}) error
}

//NewCodecFunc NewCodecFunc
type NewCodecFunc func(io.ReadWriteCloser) Codec

//Type Type
type Type string

const (
	//GobType GobType
	GobType Type = "application/gob"
	//JSONType JSONType
	JSONType Type = "application/json"
)

//NewCodecFuncMap NewCodecFuncMap
var NewCodecFuncMap map[Type]NewCodecFunc

func init()  {
	NewCodecFuncMap = make(map[Type]NewCodecFunc)
	NewCodecFuncMap[GobType] = NewGobCodec
}