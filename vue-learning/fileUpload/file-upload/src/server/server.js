const http = require("http");
const path = require("path");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const server = http.createServer();
const PORT = 3000;
const UPLOAD_DIR = path.resolve(__dirname, "..", "target"); //大文件存储路径，存储到当前目录上一层的target目录下
console.log("UPLOAD_DIR", UPLOAD_DIR);
console.log("__dirname", __dirname); // __dirname 为当前目录

const resolvePost = (req) =>
  new Promise((resolve) => {
    let chunk = "";
    req.on("data", (data) => {
      chunk += data;
    });

    req.on("end", () => {
      resolve(JSON.parse(chunk));
    });
  });

const pipeStream = (path, writeStream) =>
  new Promise((resolve) => {
    const readStream = fse.createReadStream(path);
    readStream.on("end", () => {
      fse.unlinkSync(path);
      resolve();
    });
    readStream.pipe(writeStream);
  });

//合并切片
const mergeFileChunk = async (filePath, filename, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, filename);
  const chunkPaths = await fse.readdir(chunkDir);

  //根据切片下标进行排序
  chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        //指定位置创建可写流
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      )
    )
  );

  fse.rmdirSync(chunkDir); //合并后删除保存切片的目录
};

server.on("request", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    req.status = 200;
    res.end();
    return;
  }

  if (req.url === "/merge") {
    const data = await resolvePost(req);
    const { filename, size } = data;
    const filePath = path.resolve(UPLOAD_DIR, `${filename}`);
    await mergeFileChunk(filePath, filename);
    res.end(
      JSON.stringify({
        code: 0,
        message: "file merged success",
      })
    );
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
