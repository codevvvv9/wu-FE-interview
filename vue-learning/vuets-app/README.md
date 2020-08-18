# vuets-app
使用`vue-cli4+TS+element-ui`做的后台管理系统

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# 配置`vuex`步骤
## 安装`jwt-decode @types/jwt-decode vuex-class`
```
npm i jwt-decode @types/jwt-decode //生成jwt
npm i vuex-class //使用vuex的类的写法
```

## 拆分成`state.ts getters.ts mutations.ts actions.ts`
```
import { GetterTree } from "vuex"; 
import { MutationTree } from "vuex";
import { ActionTree } from "vuex";
//除了state.ts，其余三个文件引入Tree
```
## 在具体的组件中使用
通过引入`vuex-class`
```
import { State, Getter, Mutation, Action } from "vuex-class";

export default class 组件名 extends Vue {
  @Action("actions中的方法名字") actions中的方法
  //下面的代码可以直接使用
  this.actions中的方法()
}
```

# 登录页
- 测试账户信息如下所示：
```javascript
{
  username: "admin",
  password: "123456"
}
```
