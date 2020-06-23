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

### mapState && mapGetters
两者都可以获得state中的值，但是getters里面可以处理state中的值，并将处理后的值传出去，State只能单纯的拿到值而已。

例如：有时候需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：getters出场
