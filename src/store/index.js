import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerIndex:0,
    movieDetail:{},
    userInfo:false,
    searchList:[],
    isWishList:[],
    isLookList:[],
    buyTicket:[],
    ticketDate:[],
    cityName:"广州"
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
    },
    changeWishList(state,payload){
      state.isWishList = payload
    },
    changeLookList(state,payload){
      state.isLookList = payload
    },
    changeBuyTicket(state,payload){
      state.buyTicket = payload
    },
    changeTicketDate(state,payload){
      state.ticketDate = payload
    },
    changeCityName(state,payload){
      state.cityName = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
