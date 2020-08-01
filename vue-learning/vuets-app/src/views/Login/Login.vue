<template>
  <div class="login">
    <v-loginHeader>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        label-position="left"
        slot="container"
      >
        <div class="title">
          <h3>
            账号密码登录
          </h3>
        </div>
        <!-- username -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            auto-complete="off"
            placeholder="账号"
          >
            <i class="fa fa-user-o" slot="prefix"></i>
          </el-input>
        </el-form-item>

        <!-- password -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
            placeholder="密码"
          >
            <i class="fa fa-lock" slot="prefix"></i>
          </el-input>
        </el-form-item>

        <!-- 登录button-->
        <el-form-item>
          <el-button
            @click.native.prevent="handleSubmit"
            type="primary"
            style="width: 100%;"
          >
            登录
          </el-button>
        </el-form-item>

        <!-- 7天登录和忘记密码-->
        <el-form-item>
          <el-checkbox
            v-model="ruleForm.autoLogin"
            :checked="ruleForm.autoLogin"
            >7天自动登录</el-checkbox
          >
          <el-button @click="handleForgetPassword" type="text" class="forget"
            >忘记密码？</el-button
          >
        </el-form-item>
      </el-form>
    </v-loginHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import LoginHeader from "./LoginHeader.vue";
import router from '../../router/index';

@Component({
  components: {
    "v-loginHeader": LoginHeader,
  },
})
export default class Login extends Vue {
  @Provide() ruleForm: {
    username: String;
    password: String;
    autoLogin: boolean;
  } = {
    username: "",
    password: "",
    autoLogin: true, //是否自动登录
  };

  @Provide() rules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "change" }],
  };

  handleSubmit(): void {
    (this.$refs["ruleForm"] as any).validate((valid: boolean) => {
      if (valid) {
        console.log("校验通过")
      }
    });
  }

  handleForgetPassword(): void {
    this.$router.push("/password")
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>
