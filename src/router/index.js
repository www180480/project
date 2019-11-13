import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import main from '@/components/main'
import classify from '@/components/classify'
import shop from '@/components/shop'
import self from '@/components/self'
import login from '@/components/login'
import register from '@/components/register'
import detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      children:[
        {
          path:'/',
          component:index
        },
        {
          path:'/classify',
          component:classify
        },
        {
          path:'/shop',
          component:shop
        },
        {
          path:'/self',
          component:self
        }
      ]
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'/register',
      component:register
    },
    {
      path:'/detail',
      component:detail
    }
  ]
})
