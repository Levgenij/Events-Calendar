import Header from '../components/interface/Header'

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
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    components: {
      header: Header,
      default: resolve => require(['@/components/Main'], resolve)
    }
  }
]
