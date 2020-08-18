<template>
  <div class="table-data">
    <div class="search-box">
      <el-input
        size="small"
        v-model="searchValue"
        placeholder="请输入课程名称检索"
      ></el-input>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
        >搜索🔍</el-button
      >
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :height="tHeight"
      class="table-box"
    >
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column label="课程名称" prop="title"></el-table-column>
      <el-table-column
        width="120"
        label="课程等级"
        prop="level"
      ></el-table-column>
      <el-table-column width="120" label="技术栈" prop="type"></el-table-column>
      <el-table-column
        width="120"
        label="报名人数"
        prop="count"
      ></el-table-column>
      <el-table-column
        width="160"
        label="上线日期"
        prop="date"
      ></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" size="mini"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.$index, scope.row)" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="pages" ref="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from "vue-property-decorator";
@Component({
  components: {},
})
export default class DataTable extends Vue {
  @Provide() searchValue: String = ""; //搜索框
  @Provide() tHeight: number = document.body.offsetHeight - 270; //表格的高度
  @Provide() tableData: Array<Object> = []; //表格数据
  @Provide() page: Number = 1; //当前页
  @Provide() size: Number = 5; //请求数据的个数 默认是5
  @Provide() total: Number = 0; //总数据的个数

  @Provide() dialogVisible: Boolean = false; //是否展示编辑页面
  @Provide() formData: {
    title: String;
    type: String;
    level: String;
    count: String;
    date: String;
  } = {
    title: "",
    type: "",
    level: "",
    count: "",
    date: "",
  };

  handleEdit(
    index: Number,
    row: {
      title: String;
      type: String;
      level: String;
      count: String;
      date: String;
    }
  ): void {
    this.formData = row;
    this.dialogVisible = true;
  }

  handleDelete(
    index: number,
    row: {
      _id: String;
    }
  ) {
    (this as any).$axios
      .delete(`/api/profiles/delete/${row._id}`)
      .then((result: any) => {
        this.$message({
          type: "success",
          message: result.data.msg,
        });

        this.tableData.splice(index, 1);
      })
      .catch((err: any) => {});
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  created() {
    this.loadData();
  }

  loadData() {
    (this as any)
      .$axios(`/api/profiles/loadMore/${this.page}/${this.size}`)
      .then((result: any) => {
        this.tableData = result.data.data.list;
        this.total = result.data.data.total;
      })
      .catch((err: any) => {});
  }

  handleSizeChange(val: Number): void {
    this.size = val;
    this.page = 1;
    this.searchValue ? this.loadSearchData() : this.loadData();
  }

  handleCurrentChange(val: Number): void {
    this.page = val;
    this.searchValue ? this.loadSearchData() : this.loadData();
  }

  handleSearch(): void {
    this.page = 1;
    this.searchValue ? this.loadSearchData() : this.loadData();
  }
  // 按条件搜索
  loadSearchData() {
    (this as any)
      .$axios(
        `/api/profiles/search/${this.searchValue}/${this.page}/${this.size}`
      )
      .then((result: any) => {
        this.tableData = result.data.datas.list;
        this.total = result.data.datas.total;
      })
      .catch((err: any) => {});
  }
}
</script>

<style lang="scss" scoped>
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>

