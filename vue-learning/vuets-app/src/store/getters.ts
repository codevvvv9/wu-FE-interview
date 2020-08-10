import { GetterTree } from "vuex";

const getters: GetterTree<any, any> = {
  user(state: any): String {
    return state.user
  },
  routers(state: any): Array<String> {
    return state.routers
  }
}

export default getters