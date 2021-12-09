import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerIndex:0,
    movieDetail:{},
    userInfo:false,
    searchList:[]
  },
  mutations: {
    changeRouterIndex(state,payload){
      state.routerIndex = payload
    },
    changeMovieDetail(state,payload){
      state.movieDetail = payload
    },
    changeUserInfo(state,payload){
      state.userInfo = payload
    },
    changeSearchList(state,payload){
      state.searchList = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
