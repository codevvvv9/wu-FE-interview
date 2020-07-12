const { program } = require("commander");
const api = require("./index");
program.option("-x, --xxx", "what the x");
// program
//   .command("add <taskName>") // <taskName>里面的taskName 会作为参数传入到action函数里面, 只接受一个单词
//   .description("add a new task")
//   .action((taskName) => {
//     console.log("add a task called: ", taskName);
//   });
program
  .command("add")
  .description("add a new task")
  .action((...args) => {
    const words = args.slice(1).join(" ");
    console.log("words", words)
    api
      .add(words)
      .then(() => {
        console.log("添加任务成功");
      }, (error) => {
        console.log('添加任务失败：', error);
      })
      .catch((error) => {
        console.log("添加任务失败: ", error);
      });
  });
program
  .command("clear")
  .description("clear all task")
  .action(() => {
    api
      .clear()
      .then(() => {
        console.log("清空任务成功");
      })
      .catch((error) => {
        console.log("清空任务失败： ", error);
      })
  });
  if (process.argv.length === 2) {
    //node cli.js 如果只写这两个参数，证明用户只想看看所有的任务列表
    api.showAll()
    return
  }
  program.parse(process.argv); //node cli.js 默认在控制台打印全部信息
