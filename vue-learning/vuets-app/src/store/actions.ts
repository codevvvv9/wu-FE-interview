import { ActionTree } from "vuex";
import jwt_decode from "jwt-decode";
import { asyncRouterMap } from "../router";

const actions: ActionTree<any, any> = {
  async setUser ({state, commit}, user: any) {
    const decoded: any = jwt_decode(user)
    commit('SET_USER', decoded)
    commit('SET_ROUTERS', asyncRouterMap)
  }
}

export default actions