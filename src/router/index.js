import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login')
// const Home = () => import('../components/Home')
import Home from '../components/Home'
const Welcome = () => import('../components/Welcome')
const User = () => import('../components/user/Users')
const Rights = () => import('../components/power/Rights')
const Roles = () => import('../components/power/Roles.vue')
const Cate = () => import('../components/goods/Cate.vue')
const Params = () => import('../components/goods/Params.vue')
const GoodsList = () => import('../components/goods/List.vue')
const Add = () => import('../components/goods/Add.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'login1212121',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome
      },
      {
        path: '/users',
        name: 'user',
        component: User
      }, {
        path: '/rights',
        name: 'rights',
        component: Rights
      }, {
        path: '/roles',
        name: 'roles',
        component: Roles
      }, {
        path: '/categories',
        name: 'categories',
        component: Cate
      }, {
        path: '/params',
        name: 'params',
        component: Params
      }, {
        path: '/goods',
        name: 'goods',
        component: GoodsList,
      }, {
        path: '/add',
        component: Add
      }
    ]
  }

]


const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  console.log("前往", to)
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  console.log(tokenStr)
  if (!tokenStr) return next('/login')
  next()
})

export default router
