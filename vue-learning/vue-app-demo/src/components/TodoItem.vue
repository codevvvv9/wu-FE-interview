<template>
  <div :class="{'is-complete': todo.completed}" class="todo-item">
    <p> 
      <input type="checkbox" name="" id="" @change="markComplete">
      {{ todo.title }}
      <button class="del" @click="deleteTodoItem">X</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object
    }
  },
  methods: {
    markComplete() {
      this.todo.completed = !this.todo.completed
    },
    deleteTodoItem() {
      this.$emit("deleteTodoItem", this.todo.id)
    }
  }
}
</script>

<style scoped>
  .todo-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #cccccc dotted;
  }

  .is-complete {
    text-decoration: line-through;
  }
  .del {
    background: #ff0000;
    color: #ffffff;
    border: none;
    padding: 5px 9px;
    border-radius: 50%;
    cursor: pointer;
    float: right;
    outline: none;
  }
  .del:focus {
    box-shadow: 0px 0px 2px 2px rgba(228, 7, 7, 0.3);
  }
</style>