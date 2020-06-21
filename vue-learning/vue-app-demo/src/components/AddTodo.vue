<template>
  <div>
    <form action="" method="get" @submit.prevent="addTodo">
      <input type="text" name="title" id="" v-model="title" placeholder="请添加待办事项">
      <input type="submit" value="添加" class="btn">
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: "AddTodo",
  data() {
    return {
      title: ""
    }
  },
  methods: {
    addTodo(e) {
      if (this.title) {
        // e.preventDefault() 等同于上述的.prevent
        const newTodo = {
          // id: uuidv4(), //真实接口不需要造id
          title: this.title,
          isCompleted: false
        }
        this.$emit("handleAddTodo", newTodo)
        this.title = ""
      } else {
        alert("请输入待办事项")
      }
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
  }

  input[type="text"] {
    flex: 10;
    padding: 5px;
  }

  input[type="submit"] {
    flex: 2;
  }
</style>>
