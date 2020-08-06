const crypto = require("crypto");

//构建魔法字符串
const MAGIC_KEY = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

/**
 * 生成ws的响应头
 * @param { string } secWsKey ws的请求头的key Sec-Websocket-Key
 */
function generateAcceptValue(secWsKey) {
  return crypto
    .createHash("sha1")
    .update(secWsKey + MAGIC_KEY, "utf8")
    .digest("base64"); //摘要
}
//消息通信分为消息解析和消息响应
/**
 * 解析客户端发送过来的ws 数据帧
 * @param { ArrayBuffer} buffer 请求的内容
 */
function parseMessage(buffer) {
  // 解析第一个字节的第一位
  const firstByte = buffer.readUInt8(0);
  //数据帧的前8位分别代表的含义
  //[FIN, RSV, RSV, RSV, OPCODE, OPCODE, OPCODE, OPCODE]
  //从首位右移7位判断是不是最后一帧数据
  const isFinalFrame = Boolean((firstByte >>> 7) & 0x01);
  console.log("parseMessage -> isFinalFrame", isFinalFrame);
  //取出操作码，第四位
  /**
   * 数据帧：
   * 0x0
   *
   * 控制帧：
   */
  const OPCODE = firstByte & 0x0f;
  switch (OPCODE) {
    case 0x08:
      //连接关闭
      break;
    case 0x02:
      //二进制帧，暂时不处理
      break;
    case 0x01:
      //目前暂时处理文本帧为例
      let offset = 1;
      const secondByte = buffer.readUInt8(offset);

      //MASK：1bit, 表示有效载荷（payload）是否启用了掩码 客户端发送时必学带着，服务端发送时不需要
      //MASK这一位在第9位上，也就是第二个字节的首位
      const useMask = Boolean((secondByte >>> 7) & 0x01);
      console.log("parseMessage -> useMask", useMask);
      //有效载荷的长度
      const payloadLength = secondByte & 0x7f;
      offset += 1;
      //0-4个字节的掩码key内容
      let MASK = [];
      //如果有效载荷的长度在0-125之间，则后面四个字节 被识别成 32位的掩码
      if (payloadLength <= 0x7d) {
        //载荷长度小于125
        MASK = buffer.slice(offset, 4 + offset);
        offset += 4;
        console.log("payload length: ", payloadLength);
      } else if (payloadLength === 0x7e) {
        //如果长度是126，后面两个字节也被认为是有效载荷的长度
        console.log("payload length: ", buffer.readInt16BE(offset));
        //126长度的话，2个字节做有效载荷长度，掩码长度就是4个字节，
        MASK = buffer.slice(offset + 2, offset + 2 + 4);
        offset += 6;
      } else {
        //如果payload长度是127，那么后面的8字节也被认为是payload的长度
        MASK = buffer.slice(offset + 8, offset + 8 + 4);
        offset += 12;
      }

      //读取后面的payload, 计算掩码，得到原来的字节内容
      const newBuffer = [];
      const dataBuffer = buffer.slice(offset);
      for (let i = 0, j = 0; i < dataBuffer.length; i++, j % 4) {
        const nextBuffer = dataBuffer[i];
        newBuffer.push(nextBuffer ^ MASK[j]);
      }

      return Buffer.from(newBuffer).toString();
      break;
    default:
      return "";
      break;
  }
}

/**
 * 处理响应的数据
 * @param {  } data
 */
function constructReply(data) {
  const json = JSON.stringify(data);
  const jsonByteLength = Buffer.byteLength(json);
  // 目前只支持小于65535字节的负载
  const lengthByteCount = jsonByteLength < 126 ? 0 : 2;
  const payloadLength = lengthByteCount === 0 ? jsonByteLength : 126;
  const buffer = Buffer.alloc(2 + lengthByteCount + jsonByteLength);
  // 设置数据帧首字节，设置opcode为1，表示文本帧
  buffer.writeUInt8(0b10000001, 0);
  buffer.writeUInt8(payloadLength, 1);
  // 如果payloadLength为126，则后面两个字节（16位）内容应该，被识别成一个16位的二进制数表示数据内容大小
  let payloadOffset = 2;
  if (lengthByteCount > 0) {
    buffer.writeUInt16BE(jsonByteLength, 2);
    payloadOffset += lengthByteCount;
  }
  // 把JSON数据写入到Buffer缓冲区中
  buffer.write(json, payloadOffset);
  return buffer;
}

module.exports = {
  generateAcceptValue,
  parseMessage,
  constructReply,
};
