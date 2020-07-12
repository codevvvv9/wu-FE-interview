const db = require("./db.js");
const inquirer = require("inquirer");

module.exports.add = async (title) => {
  //1、读取之前的任务
  const list = await db.read();
  //2、往任务列表里面增加任务项
  list.push({ title, done: false });
  //3、存储任务到文件中
  await db.write(list);
};

module.exports.clear = async () => {
  await db.write([]);
};

module.exports.showAll = async () => {
  //1、获取之前读取的任务
  const list = await db.read();
  inquirer
    .prompt([
      {
        type: "list",
        name: "index",
        message: "请选择你的操作",
        choices: [
          { name: "退出", value: "-1" },
          ...list.map((task, index) => {
            return {
              name: `${task.done ? "[X]" : "[_]"}: ${index + 1} - ${
                task.title
              }`,
              value: index.toString(),
            };
          }),
          { name: "+ 创建任务", value: "-2" },
        ],
      },
    ])
    .then((answer) => {
      const index = parseInt(answer.index);
      if (index >= 0) {
        //选择一个任务了
        inquirer
          .prompt({
            type: "list",
            name: "action",
            choices: [
              { name: "退出", value: "quit" },
              { name: "已完成", value: "markAsDone" },
              { name: "未完成", value: "markAsUnDone" },
              { name: "改标题", value: "updateTitle" },
              { name: "删除", value: "remove" },
            ],
          })
          .then((answer2) => {
            switch (answer2.action) {
              case "markAsDone":
                list[index].done = true
                db.write(list)
                break;
              case "markAsUnDone":
                list[index].done = false
                db.write(list)
                break;
              case "updateTitle":
                inquirer.prompt({
                  type: 'input',
                  name: 'title',
                  message: "请输入新的标题",
                  default: list[index].title
                }).then((answer) => {
                  list[index].title = answer.title
                  db.write(list)
                });
                break;
              case "remove":
                list.splice(index, 1)
                db.write(list)
                break;
              default:
                break;
            }
          });
      } else if (index === -2) {
        //创建任务
        inquirer.prompt({
          type: 'input',
          name: 'title',
          message: "请输入任务标题",
        }).then((answer) => {
          list.push({
            title: answer.title,
            done: false
          })
          db.write(list)
        });
      }
    });
};
