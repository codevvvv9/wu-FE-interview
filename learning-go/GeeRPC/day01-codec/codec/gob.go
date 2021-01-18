package codec

import (
	"bufio"
	"encoding/gob"
	"io"
	"log"
)

//GobCodec GobCodec
type GobCodec struct {
	conn io.ReadWriteCloser
	buf  *bufio.Writer
	dec  *gob.Decoder
	enc  *gob.Encoder
}

var _ Codec = (*GobCodec)(nil)

//NewGobCodec NewGobCodec
func NewGobCodec(conn io.ReadWriteCloser) Codec {
	buf := bufio.NewWriter(conn)
	return &GobCodec{
		conn: conn,
		buf:  buf,
		dec:  gob.NewDecoder(conn),
		enc:  gob.NewEncoder(buf),
	}
}

//ReadHeader ReadHeader
func (c *GobCodec) ReadHeader(h *Header) error {
	return c.dec.Decode(h)
}

//ReadBody ReadBody
func (c *GobCodec) ReadBody(body interface{}) error {
	return c.dec.Decode(body)
}

//Write Write
func (c *GobCodec) Write(h *Header, body interface{}) (err error) {
	defer func() {
		_ = c.buf.Flush()
		if err != nil {
			_ = c.Close()
		}
	}()

	if err := c.enc.Encode(h); err != nil {
		log.Println("rpc codec: gob error encoding header:", err)
		return err
	}

	if err := c.enc.Encode(body); err != nil {
		log.Println("rpc codec: gob error encoding body:", err)
		return err
	}

	return nil
}

//Close Close
func (c *GobCodec) Close() error {
	return c.conn.Close()
}
