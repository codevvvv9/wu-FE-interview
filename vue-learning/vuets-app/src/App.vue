<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

export default class App extends Vue {
  // 存储用户信息
  @Action("setUser") setUser: (
    user: String,
    obj?: { state: any; commit: any }
  ) => any;
  created() {
    this.setUser(localStorage.tsToken);
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
