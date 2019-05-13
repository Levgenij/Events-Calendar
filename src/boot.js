import {axios} from './util/axios'
import {authMiddlewareInterceptor, handleErrorInterceptor} from './router/middleware'

export const initializeInterceptors = (vm) => {
  axios.interceptors.response.use(authMiddlewareInterceptor(vm), handleErrorInterceptor(vm))
}
