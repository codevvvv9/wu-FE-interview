<template>
  <div>
    <el-tabs type="border-card" v-model="tabPosition">
      <el-tab-pane label="折线图" name="line">
        折线图
      </el-tab-pane>
      <el-tab-pane label="柱状图" name="bar">

      </el-tab-pane>
      <el-tab-pane label="饼图" name="pie">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
@Component({
  components: {},
})
export default class DataCharts extends Vue {
  @Provide() tabPosition: String = "line"
}
</script>

<style>

</style>