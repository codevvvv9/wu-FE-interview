import { MutationTree } from "vuex";

const mutations: MutationTree<any> = {
  SET_USER(state: any, user: String) {
    state.user = user
  }
}

export default mutations