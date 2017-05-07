import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Documentation from '@/components/Documentation'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/online',
      name: 'Home',
      component: Home
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: Documentation
    },
  ]
})
