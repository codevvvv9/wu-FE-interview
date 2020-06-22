<template>
  <header class="header">
    <h1>待办事项</h1>
    <!-- 路由 -->
    <nav>
      <router-link to="/">主页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.header {
  background-color: #333;
  text-align: center;
  color: #ffffff;
  padding: 10px;
}

.header a {
  color: #fff;
  padding-right: 5px;
  text-decoration: none;
}
</style>
