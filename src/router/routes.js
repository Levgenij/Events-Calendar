export default [
  {
    path: '/sign-in',
    name: 'login',
    meta: {
      title: 'Login',
      requiresAuth: false
    },
    components: {
      default: resolve => require(['@/components/auth/Login'], resolve)
    }
  },
]
