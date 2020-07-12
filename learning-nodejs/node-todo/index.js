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
/**
 * 在控制台打印所有的任务
 * @param { array } list 任务列表
 */
function printTasks(list) {
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
        askForAction(list, index);
      } else if (index === -2) {
        askForCreateTask(list);
      }
    });
}

/**
 * 用户操作
 * @param { array } list 任务列表
 * @param { number } index 任务序号
 */
function askForAction(list, index) {
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
      const actions = {
        markAsDone,
        markAsUnDone,
        updateTitle,
        remove,
      };
      const action = actions[answer2.action];
      action && action(list, index);
    });
}

/**
 * 用户操作-创建一个新的任务
 * @param { array } list 任务列表
 */
function askForCreateTask(list) {
  //创建任务
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "请输入任务标题",
    })
    .then((answer) => {
      list.push({
        title: answer.title,
        done: false,
      });
      db.write(list);
    });
}

function markAsDone(list, index) {
  list[index].done = true;
  db.write(list);
}

function markAsUnDone(list, index) {
  list[index].done = false;
  db.write(list);
}

function updateTitle(list, index) {
  inquirer
    .prompt({
      type: "input",
      name: "title",
      message: "请输入新的标题",
      default: list[index].title,
    })
    .then((answer) => {
      list[index].title = answer.title;
      db.write(list);
    });
}

function remove(list, index) {
  list.splice(index, 1);
  db.write(list);
}
module.exports.showAll = async () => {
  //1、获取之前读取的任务
  const list = await db.read();
  //使用inquirer打印之前的任务
  printTasks(list);
};
