import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/footer-layout'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search')
    },
    {
      path: '/search/:q',
      name: 'search-result',
      component: () => import('@/views/search-result')
    },
    {
      path: '/article/:articleId',
      name: 'article',
      component: () => import('@/views/article')
    }
  ]
})

export default router
