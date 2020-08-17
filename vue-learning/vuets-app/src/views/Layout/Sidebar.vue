<template>
  <el-scrollbar class="el-scrollbar">
    <el-menu
      class="el-menu-slide"
      :default-active="$router.currentRoute.path"
      router
    >
      <template
        v-for="item in getRouters"
        v-if="item.hidden && item.children && item.children.length > 0"
      >
        <!--首页和账户管理的children的length长度是1-->
        <el-menu-item
          v-if="item.children.length === 1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <i
            v-if="item.children[0].meta.icon"
            :class="item.children[0].meta.icon"
          ></i>
          <!--element的插槽，不是自己写的-->
          <span slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
        <!-- item.children.length不是1 说明有多个子元素 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta && item.meta.title" slot="title">{{
              item.meta.title
            }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :index="child.path"
            :key="child.name"
          >
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta && child.meta.title" slot="title">{{
              child.meta.title
            }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { State, Getter, Mutation, Action } from "vuex-class";

@Component({
  components: {},
})
export default class Sidebar extends Vue {
  @Getter("routers") getRouters: Array<Object>;
  created() {
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>
