import  { store } from '../store'


export default (to, from, next) => {
  if(store.getters.user) {
    const user = store.getters.user
    if(user.type === 'SuperAdmin') {
        next()
    }
    
  }else {
    next('/signin')
  }
}
