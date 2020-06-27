<template>
  <div>
    <h3>添加内容</h3>
    <div class="add">
      <form action="" method="get" @submit.prevent="onSubmit">
        <input
          type="text"
          placeholder="...添加待办事项"
          v-model="title"
        />
        <input type="submit" value="添加" />
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {},
  data() {
    return {
      title: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(["addTodo"]), //多个actions需要 扩展运算符
    onSubmit() {
      //分发addTodo action
      this.addTodo(this.title)
      this.title = ""
    }
  },
  components: {},
};
</script>

<style scoped>
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}

input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
</style>
