const http = require("http");
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const server = http.createServer();
const PORT = 3000;
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); //大文件存储路径，存储到当前目录上一层的target目录下
console.log("UPLOAD_DIR", UPLOAD_DIR);
console.log("__dirname", __dirname); // __dirname 为当前目录

server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    req.status = 200;
    res.end();
    return;
  }

  const multipart = new multiparty.Form();

  multipart.parse(req, async (err, fields, files) => {
    console.log("files", files);
    console.log("fields", fields);
    console.log("err", err);
    if (err) {
      return;
    }

    const [chunk] = files.chunk;
    const [hash] = fields.hash;
    const [filename] = fields.filename;
    const chunkDir = path.resolve(UPLOAD_DIR, filename);

    //切片目录不存在，则创建
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir);
    }

    await fse.move(chunk.path, `${chunkDir}/${hash}`);
    res.end("received file chunk");
  });
});
server.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);
