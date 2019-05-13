import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import VeeValidate from 'vee-validate'
import VueLocalStorage from 'vue-ls'
import GoogleAuth from 'vue-google-oauth2'
import config from './config/index'
import Datetime from 'vue-datetime'
import VuetifyConfirm from 'vuetify-confirm'

import 'vue-datetime/dist/vue-datetime.css'

Vue.config.productionTip = false

Vue.use(VuetifyConfirm)
Vue.use(Datetime)
Vue.use(VeeValidate)
Vue.use(VueLocalStorage)
Vue.use(GoogleAuth, config.services.google)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

