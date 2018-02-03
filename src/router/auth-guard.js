import  { store } from '../store'
import * as firebase from 'firebase'

export default (to, from, next) => {
  if(store.getters.user) {
    //   console.log('cambiado de rutas')
      store.state.error = null
      next()
  }else {
      next('/signin')
  }
}
