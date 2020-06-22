<template>
  <div class="home">
    <AddTodo @handleAddTodo="handleAddTodo"></AddTodo>
    <Todos :todoData="todoData" @deleteTodoItem="handleDeleteTodo"></Todos>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Todos from "@/components/Todos";
import AddTodo from "@/components/AddTodo";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Todos,
    AddTodo,
  },
  data() {
    return {
      todoData: [],
    };
  },
  created() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
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
