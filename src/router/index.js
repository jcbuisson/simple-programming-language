import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import codemirror from '@/components/MyCodeMirror'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/codemirror',
      name: 'codemirror',
      component: codemirror
    },
  ]
})
