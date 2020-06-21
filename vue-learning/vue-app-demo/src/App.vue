<template>
  <div id="app">
    <!-- Header -->
    <Header></Header>
    <AddTodo @handleAddTodo="handleAddTodo"></AddTodo>
    <Todos :todoData="todoData" @deleteTodoItem="handleDeleteTodo"></Todos>
  </div>
</template>
<script>
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import axios from "axios";

export default {
  components: {
    Todos,
    Header,
    AddTodo,
  },
  data() {
    return {
      todoData: [],
    };
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        this.todoData = res.data;
      })
      .catch((error) => {
        console.log("error is", error);
      });
  },
  methods: {
    handleDeleteTodo(id) {
      // this.todoData = this.todoData.filter((todoItem) => todoItem.id !== id);
      axios
        .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => {
          this.todoData = this.todoData.filter(
            (todoItem) => todoItem.id !== id
          );
        })
        .catch((error) => {
          console.log("error is", error);
        });
    },
    handleAddTodo(newTodo) {
      //等价于 this.todoData.push() or unshift()
      // this.todoData = [...this.todoData, newTodo];
      const { title, completed } = newTodo;
      axios
        .post("https://jsonplaceholder.typicode.com/todos", {
          title,
          completed,
        })
        .then((res) => {
          this.todoData = [newTodo, ...this.todoData];
        })
        .catch((error) => {
          console.log("error is", error);
        });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
  outline: none;
}

.btn:hover {
  background: #666;
  outline: none;
}
</style>
