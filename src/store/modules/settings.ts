import { Commit } from 'vuex'

export interface SettingState {
  activeMenuName: string
}
const state: SettingState = {
  activeMenuName: ''
}

const mutations = {
  SET_ACTIVE_MENU_NAME: (state: SettingState, payload: string) => {
    state.activeMenuName = payload
  }
}

const actions = {
  setActiveMenuName (context: { commit: Commit, state: SettingState }, payload: string) {
    context.commit('SET_ACTIVE_MENU_NAME', payload)
  }
}

const getters = {
  activeMenuName: (state: SettingState) => state.activeMenuName
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
