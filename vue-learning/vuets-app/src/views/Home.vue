<template>
  <div class="home">
    <div class="home-body">
      <h4 class="title">欢迎来到少林大学堂</h4>
      <div class="des">少林学堂让你学到想学的基础知识</div>
      <el-button @click="learn">进入学习</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Home extends Vue {
  learn(): void {
    window.open("https://github.com/codevvvv9/wu-FE-interview", "_blank");
  }
}
</script>

<style scoped></style>
