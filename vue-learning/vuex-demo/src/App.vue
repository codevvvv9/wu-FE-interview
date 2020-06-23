<template>
  <div id="app">
    <!-- state & getters -->
    <!-- <p>{{ count }}</p>
    <p>{{ completedTodos }}</p>
    <p>{{ completedTodosCount }}</p>
    <p>{{ getTodosById(1) }}</p> -->

    <!-- mutations -->
    <button @click="decrementCount({amount: 1})">-</button>
    <span>{{ count }}</span>
    <button @click="incrementCount">+</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "App",
  components: {
    HelloWorld
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    // todos() {
    //   return this.$store.state.todos
    // }
  },
  // computed: mapState({
  //   count: state => state.count,
  //   todos: state => state.todos
  // })
  //state && mapState
  // computed: mapState(["count", "todos"])

  // state && mapGetters
  // computed: {
  //   count() {
  //     //执行的是count的返回值
  //     return this.$store.getters.count;
  //   },
  //   completedTodos() {
  //     return this.$store.getters.completedTodos;
  //   },
  //   completedTodosCount() {
  //     return this.$store.getters.completedTodosCount
  //   },
  //   getTodosById() {
  //     return this.$store.getters.getTodosById
  //   }
  // }
  // computed: mapGetters(["count", "completedTodos", "completedTodosCount", "getTodosById"])

  // mutations & mapMutations
  // methods: {
  //   decrement(n) {
  //     this.$store.commit("decrementCount", n)
  //   },
  //   increment() {
  //     this.$store.commit("incrementCount")
  //   }
  // }
  methods: mapMutations(["incrementCount", "decrementCount"])
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
