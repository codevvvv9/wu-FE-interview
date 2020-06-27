//导入和创建模块
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = require("./config/key").mongoURI;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB is connected');
    
  })
  .catch((error) => console.log(error));
//路由定义
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;

//监听端口
app.listen(port, () => {
  console.log(`Server running on port ${port}, it's good`);
});
