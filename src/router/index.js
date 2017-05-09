import Vue from 'vue'
import Router from 'vue-router'
import Sandbox from '@/components/Sandbox'
import Documentation from '@/components/Documentation'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/documentation',
      name: 'Documentation',
      component: Documentation
    },
  ]
})
