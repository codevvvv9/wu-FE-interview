const { Writable } = require('stream')
const myWritable = new Writable({
  write(chunk) {
  console.log("write: ", chunk)
  }
})

const readableStream = process.stdin
// readableStream.on('data', (chunk) => {
// // console.log("chunk", chunk.toString())
//   // myWritable.write(`writing: ${chunk.toString()}`)
// })
readableStream.pipe(myWritable)