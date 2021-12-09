import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// 移动端适配
import 'amfe-flexible'
// 动画
import 'animate.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
