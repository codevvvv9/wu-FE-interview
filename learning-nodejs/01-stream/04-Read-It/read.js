const { Readable } = require("stream");

//实现一个可读的流有两个方法。
const myStream = new Readable({});
myStream._read = () => {};

// or

class MyStream extends Readable {
  _read() {}
}
