import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import {initializeRouterAuthMiddleware} from './middleware'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: routes
})

// Initialize router middleware
initializeRouterAuthMiddleware(router)

export default router
