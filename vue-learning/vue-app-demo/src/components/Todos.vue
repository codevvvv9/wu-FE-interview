<template>
  <div>
    <div v-for="(todo, index) in todoData" :key="index">
      <TodoItem :todo="todo" @deleteTodoItem="deleteTodoItem"></TodoItem>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
export default {
  components: {
    TodoItem
  },
  name: "todo",
  props: {
    todoData: {
      type: Array
    }
  },
  methods: {
    deleteTodoItem(id) {
      this.$emit("deleteTodoItem", id)
    }
  }
}
</script>

<style>

</style>