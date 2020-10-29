import express from "express";
const app = express();
const port = 3002;

app.get("/", (req: any, res: any) => {
  res.send("Hello World! 我来");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
