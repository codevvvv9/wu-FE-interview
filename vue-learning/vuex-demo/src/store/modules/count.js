const state = {
  count: 1,
};

const getters = {
  count: (state) => state.count,
};

const mutations = {
  incrementCount(state) {
    state.count++;
  },
  decrementCount(state, payload) {
    state.count -= payload.amount;
  },
};

const actions = {
  incrementCountAsync({ commit }) {
    setTimeout(() => {
      commit("incrementCount");
    }, 2000);
  },
  decrementCountAsync({ commit }, payload) {
    setTimeout(() => {
      commit("decrementCount", payload);
    }, 2000);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
