import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import 'babel-polyfill'
// import fastclick from 'fastclick'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
// fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
