# vuex-demo

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

### getters
getters相当于state的计算属性

### mapState && mapGetters
两者都可以获得state中的值，但是getters里面可以处理state中的值，并将处理后的值传出去，State只能单纯的拿到值而已。

例如：有时候需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：getters出场

### mutations
mutations修改state状态,但是最好是同步操作
this.$store.commit("mutations中的方法名", payload)

### actions
actions将会去操作mutations,但是它是异步操作
actions中的方法名(context) {
  context.commit("mutations中的方法名")
}
