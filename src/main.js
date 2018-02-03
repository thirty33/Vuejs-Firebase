// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { store } from './store'
import router from './router'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alerts.vue'
import tableData from './components/table/tableMain.vue'
import ValidateDialog from './components/Validate/ValidateDialog.vue'
import ChangePassword from './components/changePassword/changePasswordDialog.vue'
import DeleteUserDialog from './components/deleteUser/deleteUserDialog.vue'
import SendDataDialog from './components/sendDataDialog/sendDataDialog.vue'
import ('../node_modules/vuetify/dist/vuetify.min.css')
import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'
import VueQrcodeReader from 'vue-qrcode-reader/dist/vue-qrcode-reader.common'
import JsonExcel from 'vue-json-excel'





Vue.use(VueQrcodeReader)
 

Vue.component('downloadExcel', JsonExcel)
Vue.use(Vuetify)
Vue.component('app-alert', AlertCmp)
Vue.component('tabla-data', tableData)
Vue.component('app-validate-dialog', ValidateDialog)
Vue.component('change-password-dialog', ChangePassword)
Vue.component('delete-user-dialog', DeleteUserDialog)
Vue.component('send-data-dialog',  SendDataDialog)




Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "#######",
      authDomain: "#######",
      databaseURL: "######",
      projectId: "#######",
      storageBucket: "######",
      messagingSenderId: "######"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var type
        firebase.database().ref('/users/' + user.uid + '/type').once('value')
          .then(data => {
            const typeUser = data.val()
            return type = typeUser
          })
          .then(type => {
            const obj = {
              user: user,
              type: type
          } 
            // console.log('objeto', obj) 
            this.$store.dispatch('autoSignIn', obj)
          })
          .catch(error => {
            console.log('error', error)
          })
        }
    })
    this.$store.dispatch('loadDataBase')

  }
})
