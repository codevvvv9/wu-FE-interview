const { program } = require("commander");
const api = require("./index")
program
  .option("-x, --xxx", "what the x");
// program
//   .command("add <taskName>") // <taskName>里面的taskName 会作为参数传入到action函数里面, 只接受一个单词
//   .description("add a new task")
//   .action((taskName) => {
//     console.log("add a task called: ", taskName);
//   });
program
  .command("add")
  .description("add a new task")
  .action( (...args)=> {
    const words = args.slice(1).join(" ")
    console.log("words", words)
    api.add(words)
  });
program
  .command("clear")
  .description("clear all task")
  .action((...args) => {
    console.log('this is all clear');
  })
program.parse(process.argv);