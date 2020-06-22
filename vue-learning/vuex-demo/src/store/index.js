import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 2222,
    todos: [
      {
        id: 0,
        title: "demo00",
        completed: true,
      },
      {
        id: 1,
        title: "demo01",
        completed: false,
      },
      {
        id: 2,
        title: "demo022",
        completed: true,
      },
    ],
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    count: (state) => ++state.count,
    completedTodos: (state) => {
      return state.todos.filter(todo => todo.completed);
    },
    completedTodosCount: (state, getters) => {
      return getters.completedTodos.length
    },
    // getTodosById(state) {
    //   return (id) => {
    //     return state.todos.find(todo => {
    //       return todo.id === id
    //     })
    //   }
    // }
    //上述写法可以使用连续箭头函数 高级函数柯里化来实现
    getTodosById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  },
});
