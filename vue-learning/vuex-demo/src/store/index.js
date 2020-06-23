import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 1,
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
  mutations: {
    incrementCount(state) {
      state.count++
    },
    decrementCount(state, payload) {
      state.count -= payload.amount
    },
    setTodos(state, todos) {
      state.todos = todos
    }
  },
  actions: {
    // incrementCountAsync(context) {
    //   setTimeout(() => {
    //     context.commit("incrementCount")
    //   }, 2000);
    // },
    // decrementCountAsync(context, payload) {
    //   setTimeout(() => {
    //     context.commit("decrementCount", payload)
    //   }, 2000);
    // }
    //以上写法可以使用解构
    incrementCountAsync({commit}) {
      setTimeout(() => {
        commit("incrementCount")
      }, 2000);
    },
    decrementCountAsync({commit}, payload) {
      setTimeout(() => {
        commit("decrementCount", payload)
      }, 2000);
    },
    async fetchTodos({commit}) {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      commit("setTodos", response.data)
    }
  },
  modules: {},
  getters: {
    count: (state) => state.count,
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
