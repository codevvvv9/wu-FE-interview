const state = {
  todos: []
}

const getters = {
  allTodos: state => state.todos
}

const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  },
  addTodo(state, todo) {
    state.todos.unshift(todo)
  },
  removeTodo(state, id) {
    state.todos = state.todos.filter(todo => {
      return todo.id !== id
    })
  },
  updateTodos(state, updateTodo) {
    let index = state.todos.findIndex(todo => todo.id === updateTodo.id)
    state.todos.splice(index, 1, updateTodo)
  }
}

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
    commit("setTodos", response.data)
  },

  async addTodo({commit}, title) {
    const response = await axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    })

    commit("addTodo", response.data)
  },
  async removeTodo({commit}, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    commit("removeTodo", id)
  },
  async filterTodos({commit}, count) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${count}`)
    commit("setTodos", response.data)
  },
  async updateTodos({commit}, updateTodo) {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo)
    commit("updateTodos", response.data)
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}