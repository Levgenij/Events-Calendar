import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VeeValidate from 'vee-validate'
import VueLocalStorage from 'vue-ls'
import GoogleAuth from 'vue-google-oauth2'
import config from './config/index'

Vue.config.productionTip = false

Vue.use(VeeValidate)
Vue.use(VueLocalStorage)
Vue.use(GoogleAuth, config.services.google)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

