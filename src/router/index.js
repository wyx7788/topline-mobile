import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my')

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
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('@/views/user-profile')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/views/chat')
    }
  ]
})

export default router
