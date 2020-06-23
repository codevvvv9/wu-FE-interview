const state = {
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
};

const getters = {
  completedTodos: (state) => {
    return state.todos.filter((todo) => todo.completed);
  },
  completedTodosCount: (state, getters) => {
    return getters.completedTodos.length;
  },
  // getTodosById(state) {
  //   return (id) => {
  //     return state.todos.find(todo => {
  //       return todo.id === id
  //     })
  //   }
  // }
  //上述写法可以使用连续箭头函数 高级函数柯里化来实现
  getTodosById: (state) => (id) => {
    return state.todos.find((todo) => todo.id === id);
  },
};

const mutations = {
  setTodos(state, todos) {
    state.todos = todos;
  },
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    commit("setTodos", response.data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
