/**
 * Request error middleware
 *
 * @param vm
 * @return {function(*=): Promise<never>}
 */
export const handleErrorInterceptor = (vm) => (error) => {
  vm.$router.push({name: 'login'})

  return Promise.reject(error)
}

export const authMiddlewareInterceptor = (vm) => (response) => {
  return response
}

/**
 * Handle checking user access before resolving route
 *
 * @param router
 */
export const initializeRouterAuthMiddleware = (router) => {
  const handleFailure = (to, from, next) => {
    return next({name: 'login'})
  }
  
  const handle = (to, from, next) => {
    const isGuest = router.app.$store.getters.isGuest
    const requiresAuth = to.matched.some(r => r.meta.requiresAuth)
    
    return isGuest && requiresAuth ? handleFailure(to, from, next) : next()
  }
  
  router.beforeResolve(handle)
}
