import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Data from '@/components/Admin/Main'
import Movil from '@/components/Movil/Movil'
import Signin from '@/components/user/Signin'
import Signup from '@/components/user/Signup'
import AuthGuard from './auth-guard'
import AdminGuard from './sign-up-guard'
import Venta from '@/components/Venta/Venta'
import Usuarios from '@/components/usuarios/Usuarios'
import ActivityUsers from '@/components/actividad/ActivityUsers'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Data,
      beforeEnter: AuthGuard
    },
    {
      path: '/data',
      name: 'Data',
      component: Data,
      beforeEnter: AuthGuard
    },
    {
      path: '/movil',
      name: 'Movil',
      component: Movil,
      beforeEnter: AuthGuard
    },
    {
      path: '/movil/:id',
      props: true, 
      name: 'venta',
      component: Venta,
      beforeEnter: AuthGuard
    },
    {
    	path: '/signin',
    	name: 'Signin',
    	component: Signin
    },
    {
    	path: '/signup',
    	name: 'Signup',
      component: Signup,
      beforeEnter: AdminGuard
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Usuarios,
      beforeEnter: AdminGuard
    },
    {
      path: '/actividad',
      name: 'Actividad',
      component: ActivityUsers,
      beforeEnter: AdminGuard
    }
    


  ],
  mode: 'history',
})
