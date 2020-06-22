<template>
  <div id="app">
    <p>{{ count }}</p>
    <p>{{ completedTodos }}</p>
    <p>{{ completedTodosCount }}</p>
    <p>{{ getTodosById(0) }}</p>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    HelloWorld
  },
  // computed: {
  //   count() {
  //     return this.$store.state.count
  //   },
  //   todos() {
  //     return this.$store.state.todos
  //   }
  // }
  // computed: mapState({
  //   count: state => state.count,
  //   todos: state => state.todos
  // })
  //state && computed
  // computed: mapState(["count", "todos"])
  computed: {
    count() {
      //执行的是count的返回值
      return this.$store.getters.count;
    },
    completedTodos() {
      return this.$store.getters.completedTodos;
    },
    completedTodosCount() {
      return this.$store.getters.completedTodosCount
    },
    getTodosById() {
      return this.$store.getters.getTodosById
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
