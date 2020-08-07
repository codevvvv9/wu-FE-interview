import { GetterTree } from "vuex";

const getters: GetterTree<any, any> = {
  user(state: any): String {
    return state.user
  }
}

export default getters