import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'




Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: [],
    loadVentas: [],
    ventasDuplicadas: [],
    newVentas: [],
    ventasFiltradasUsers: [],
    validateList: [],
    paidList: [],
    sendEmailList: [],
    listEmailEnd: [],
    listNumSoporte: [],
    cabeceraMenu: [
      { 
        text: 'Marca temporal',
        align: 'left',
        sortable: false,
        value: 'marcaTemporal'
      },
      {
        text: 'Nombre del Asesor que le Atendio',
        value: 'nombreAsesor'
      },
      {
        text: 'Primer nombre',
        value: 'primerNombre'
      },
      {
        text: 'Segundo nombre',
        value: 'segundoNombre'
      },
      {
        text: 'Primer apellido',
        value: 'primerApellido'
      },    
      {
        text: 'Segundo apellido',
        value: 'segundoApellido'
      },
      {
        text: 'Documento de identificacion',
        value: 'documentId'
      },
      {
        text: 'Tipo de documento', 
        value: 'tipoDeDocumento'
      },
      {
        text: 'Fecha de nacimiento',
        value: 'fechaNacimiento'
      },
      {
        text: 'Teléfono de contacto fijo',
        value: 'telefonoFijo'
      },
      {
        text: 'Teléfono de contacto celular', 
        value: 'telefonoCelular'
      },
      {
        text: 'Pais de Residencia',
        value: 'paisResidencia'
      },
      {
        text: 'Departamento o Estado',
        value: 'departamento'
      },
      {
        text: 'Ciudad de Residencia',
        value: 'ciudadResidencia'
      },
      {
        text: 'Direccion de Residencia',
        value: 'dirResidencia'
      },
      {
        text: 'Correo electronico',
        value: 'email'
      },
      {
        text: 'Ciudad de origen',
        value: 'ciudadOrigen'
      },
      {
        text: 'Ciudad de destino',
        value: 'ciudadDestino'
      },
      {
        text: 'ID-Item',
        value: 'idItem'
      },
      {
        text: 'Plan Vacacional en el que está interesado',
        value: 'planVacacional'
      },
      {
        text: 'Fecha ida',
        value: 'fechaIda'
      },
      { 
        text: 'Fecha regreso',
        value: 'fechaRegreso'
      },
      {
        text: 'Fecha de actividad',
        value: 'fechaActividad'
      },
      {
        text: 'Precio neto',
        value: 'precioNeto'
      },
      {
        text: 'Precio venta',
        value: 'precioVenta'
      },
      {
        text: 'Número de pasajeros adultos',
        value: 'numPasajerosAdultos'
      },
      {
        text: 'Número de pasajeros niños',
        value: 'numPasajerosNinos'
      },
      {
        text: 'Número de infantes',
        value: 'numInfantes'
      },
      {
        text: 'Soporte 1',
        value: 'soporte1'
      },
      {
        text: 'No. Soporte 1',
        value: 'numSoporte1'
      },
      {
        text: 'Valor Soporte 1',
        value: 'valorSoporte1'
      },
      {
        text: 'Soporte 2',
        value: 'soporte2'
      },
      {
        text: 'No. Soporte 2',
        value: 'numSoporte2'
      },
      {
        text: 'Valor Soporte 2',
        value: 'valorSoporte2'
      },
      {
        text: 'validar',
        sortable: false,
        value: 'validate'
      },
      {
        text: 'pagar',
        sortable: false,
        value: 'paid'
      },
      {
        text: 'correo qr',
        sortable: false,
        value: 'sendEmail'
      }

    ],
  loading: false,
  error: null,

  user: null,
  ventaCargada: null,
  usersItemsFilter: []
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },  
    setVenta(state, payload) {
      state.loadVentas.push(payload)
    },
    ventasCargadas (state, payload) {
      state.loadVentas = payload
    },
    // Users
    setUser(state, payload) {

      state.user = payload

    },
    // Signin
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },

    setVentaCargada (state, payload) {
      state.ventaCargada = payload

    },
    updateVenta (state, payload) {
      const venta = state.loadVentas.find(venta => {
        return venta.id === payload.id
        }
      )
      venta.validate = true
    },
    addEmailToList(state, email) {
      state.listEmailEnd.push(email)
    },
    setNumerosSoporte (state, payload) {
      state.listNumSoporte = payload
    },
    // users
    setUsers (state, payload) {
      state.users = payload
    },
    deleteUser (state, uid) {
      const element = state.users.find(user => {
        return user.id === uid
      })
      var index = state.users.indexOf(element)
      if (index > -1) {
        state.users.splice(index, 1)
      }
    },  
    // ventas duplicadas
    agregarDuplicado (state, payload) {
      state.ventasDuplicadas.push(payload)
    },
    setDuplicados (state, payload) {
      state.ventasDuplicadas = payload
    },
    deleteDuplicados (state, newVentas) {
      state.ventasDuplicadas.forEach(duplicatedVenta => {
        var index = newVentas.indexOf(duplicatedVenta)
        newVentas.splice(index,1)
      })
      state.newVentas = newVentas
    },
    setItemsUsers (state, payload) {
      const obj = []
      payload.forEach(user => {
        let item = {
          text: user.nameUser,
          value: user.id
        }
        obj.push(item)
      })
      state.usersItemsFilter = obj
    },
    setVentasFiltradas (state, payload) {
      state.ventasFiltradasUsers = payload
    },
    toggleAll (state, prop) {
      console.log('mutation', prop)
      if(prop === "sendEmail") {
        state.loadVentas.forEach(venta => {
          if(venta.sendEmail === false) {
            venta.sendEmail = true
            state.sendEmailList.push(venta.id)
          }
        })
      }

      if(prop === "paid") {
        state.loadVentas.forEach(venta => {
          if(venta.validate === true && venta.paid === false) {
            venta.paid = true
            state.paidList.push(venta.id)
          }
        })
      }
    },
    resetEmailList (state) {
      state.sendEmailList = []
    },
    resetPaidList (state) {
      state.paidList = []
    }
  },
  actions: {
    loadDataBase ({commit}) {
        commit('setLoading', true)
        firebase.database().ref('ventas').once('value')
          .then((data) => {
            const ventas = []
            const obj = data.val()

            for (let key in obj) {

              ventas.push({
                  marcaTemporal: obj[key].marcaTemporal,
                  nombreAsesor: obj[key].nombreAsesor,
                  primerNombre: obj[key].primerNombre,
                  segundoNombre: obj[key].segundoNombre,
                  primerApellido: obj[key].primerApellido,
                  segundoApellido: obj[key].segundoApellido,
                  documentId: obj[key].documentId,
                  tipoDeDocumento: obj[key].tipoDeDocumento, 
                  fechaNacimiento: obj[key].fechaNacimiento, 
                  telefonoFijo: obj[key].telefonoFijo, 
                  telefonoCelular: obj[key].telefonoCelular, 
                  paisResidencia: obj[key].paisResidencia, 
                  departamento: obj[key].departamento, 
                  ciudadResidencia: obj[key].ciudadResidencia, 
                  dirResidencia: obj[key].dirResidencia, 
                  email: obj[key].email, 
                  ciudadOrigen: obj[key].ciudadOrigen, 
                  ciudadDestino: obj[key].ciudadDestino, 
                  idItem: obj[key].idItem,
                  planVacacional: obj[key].planVacacional,
                  fechaIda: obj[key].fechaIda, 
                  fechaRegreso: obj[key].fechaRegreso,
                  fechaActividad: obj[key].fechaActividad,
                  precioNeto: obj[key].precioNeto,
                  precioVenta: obj[key].precioVenta,
                  numPasajerosAdultos: obj[key].numPasajerosAdultos, 
                  numPasajerosNinos: obj[key].numPasajerosNinos, 
                  numInfantes: obj[key].numInfantes, 
                  soporte1: obj[key].soporte1, 
                  numSoporte1: obj[key].numSoporte1,
                  valorSoporte1: obj[key].valorSoporte1, 
                  soporte2: obj[key].soporte2, 
                  numSoporte2: obj[key].numSoporte2, 
                  valorSoporte2: obj[key].valorSoporte2, 
                  soporte3: obj[key].soporte3, 
                  numSoporte3: obj[key].numSoporte3, 
                  valorSoporte3: obj[key].valorSoporte3, 
                  soporte4: obj[key].soporte4,
                  numSoporte4: obj[key].numSoporte4,
                  valorSoporte4: obj[key].valorSoporte4,
                  soporte5: obj[key].soporte5,
                  numSoporte5: obj[key].numSoporte5,
                  valorSoporte5: obj[key].valorSoporte5,
                  validate: obj[key].validate,
                  paid: obj[key].paid,
                  sendEmail: obj[key].sendEmail,
                  id: key
                  })
                }
                commit('ventasCargadas', ventas)
                commit('setLoading', false)
            })
          .catch(error => {
              console.log(error)
              commit('setLoading', false)

          })
    },
    loadNumReserva ({commit}) {
      firebase.database().ref('ventas').once('value')
        .then(data => {
          const numReservas = []
          const obj = data.val()
          for (let key in obj) {
            numReservas.push({
              key: key, 
              numSoporte1: obj[key].numSoporte1 ? obj[key].numSoporte1 : '',
              })
          }

          commit('setNumerosSoporte', numReservas)

        })
        .catch(error => {
          console.log(error)
        })
    },
    createDataBase ({commit}, payload) {
        const venta = {
          marcaTemporal: '',
          nombreAsesor: '',
          primerNombre: '',
          segundoNombre: '',
          primerApellido: '',
          segundoApellido: '',
          documentId: '',
          tipoDeDocumento: '',
          fechaNacimiento: '',
          telefonoFijo: '',
          telefonoCelular: '',
          paisResidencia: '',
          departamento: '',
          ciudadResidencia: '',
          dirResidencia: '',
          email: '',
          ciudadOrigen: '',
          ciudadDestino: '',
          idItem: '',
          planVacacional: '',
          fechaIda: '',
          fechaRegreso: '',
          fechaActividad: '',
          precioNeto: '',
          precioVenta: '',
          numPasajerosAdultos: '',
          numPasajerosNinos: '',
          numInfantes: '',
          soporte1: '',
          numSoporte1: '',
          valorSoporte1: '',
          soporte2: '',
          numSoporte2: '',
          valorSoporte2: '',
          soporte3: '',
          numSoporte3: '',
          valorSoporte3: '',
          soporte4: '',
          numSoporte4: '',
          valorSoporte4: '',
          soporte5: '',
          numSoporte5: '',
          valorSoporte5: '',
          validate: false,
          paid: false,
          sendEmail: false,

        }
        
        payload.forEach(element => {
          venta.marcaTemporal = element["Marca temporal"] ? element["Marca temporal"] : ''
          venta.nombreAsesor = element["Nombre del Asesor que le Atendio"] ? element["Nombre del Asesor que le Atendio"] : ''
          venta.primerNombre = element["Primer nombre"] ? element["Primer nombre"] : ''
          venta.segundoNombre = element["Segundo nombre"] ? element["Segundo nombre"] : ''
          venta.primerApellido = element["Primer apellido"] ? element["Primer apellido"] : ''
          venta.segundoApellido = element["Segundo apellido"] ? element["Segundo apellido"] : ''
          venta.documentId = element["Documento de identificacion o Identificacion ID #"] ? element["Documento de identificacion o Identificacion ID #"] : ''
          venta.tipoDeDocumento = element["Tipo de documento"] ? element["Tipo de documento"] : ''
          venta.fechaNacimiento = element["Fecha de nacimiento"] ? element["Fecha de nacimiento"] : ''
          venta.telefonoFijo = element["Teléfono de contacto fijo"] ? element["Teléfono de contacto fijo"] : ''
          venta.telefonoCelular = element["Teléfono de contacto celular"] ? element["Teléfono de contacto celular"] : ''
          venta.paisResidencia = element["Pais de Residencia"] ? element["Pais de Residencia"] : ''
          venta.departamento = element["Departamento o Estado"] ? element["Departamento o Estado"] : ''
          venta.ciudadResidencia = element["Ciudad de Residencia"] ? element["Ciudad de Residencia"] : ''
          venta.dirResidencia = element["Direccion de Residencia"] ? element["Direccion de Residencia"] : ''
          venta.email = element["Correo electronico"] ? element["Correo electronico"] : ''
          venta.ciudadOrigen = element["Ciudad de origen"] ? element["Ciudad de origen"] : ''
          venta.ciudadDestino = element["Ciudad de destino"] ? element["Ciudad de destino"] : ''
          venta.idItem = element["ID-Item"] ? element["ID-Item"] : ''
          venta.planVacacional = element["Plan Vacacional en el que está interesado"] ? element["Plan Vacacional en el que está interesado"] : ''
          venta.fechaIda = element["Fecha ida"] ? element["Fecha ida"] : ''
          venta.fechaRegreso = element["Fecha regreso"] ? element["Fecha regreso"] : ''
          venta.fechaActividad = element["Fecha de actividad"] ? element["Fecha de actividad"] : ''
          venta.precioNeto = element["Precio neto"] ? element["Precio neto"] : ''
          venta.precioVenta = element["Precio venta"] ? element["Precio venta"] : ''
          venta.numPasajerosAdultos = element["Número de pasajeros adultos"] ? element["Número de pasajeros adultos"] : ''
          venta.numPasajerosNinos = element["Número de pasajeros niños"] ? element["Número de pasajeros niños"] : ''
          venta.numInfantes = element["Número de infantes"] ? element["Número de infantes"] : ''
          venta.soporte1 = element["Soporte 1"] ? element["Soporte 1"] : ''
          venta.numSoporte1 = element["No. Soporte 1"] ? element["No. Soporte 1"] : ''
          venta.valorSoporte1 = element["Valor Soporte 1"] ? element["Valor Soporte 1"] : ''
          venta.soporte2 = element["Soporte 2"] ? element["Soporte 2"] : ''
          venta.numSoporte2 = element["No. Soporte 2"] ? element["No. Soporte 2"] : ''
          venta.valorSoporte2 = element["Valor Soporte 2"] ? element["Valor Soporte 2"] : ''
          venta.soporte3 = element["Soporte 3"] ? element["Soporte 3"] : ''
          venta.numSoporte3 = element["No. Soporte 3"] ? element["No. Soporte 3"] : ''
          venta.valorSoporte3 = element["Valor Soporte 3"] ? element["Valor Soporte 3"] : ''
          venta.soporte4 = element["Soporte 4"] ? element["Soporte 4"] : ''
          venta.numSoporte4 = element["No. Soporte 4"] ? element["No. Soporte 4"] : ''
          venta.valorSoporte4 = element["Valor Soporte 4"] ? element["Valor Soporte 4"] : ''
          venta.soporte5 = element["Soporte 5"] ? element["Soporte 5"] : ''
          venta.numSoporte5 = element["No. Soporte 5"] ? element["No. Soporte 5"] : ''
          venta.valorSoporte5 = element["Valor Soporte 5"] ? element["Valor Soporte 5"] : ''
          venta.validate = false,
          venta.paid = false,
          venta.sendEmail = false
            
            
          let key
          firebase.database().ref('ventas').push(venta)
            .then(data => {
              key  =  data.key
              return data
            }
            )
            .catch(error => {
                console.log(error)
            })

          })
    },
    compararVentas ({commit, getters}, newVentas) {
        // console.log('duplicados length', getters.retornarDuplicados)
        newVentas.forEach(venta => {
          const numSoporte1 =  venta["No. Soporte 1"] ? venta["No. Soporte 1"] : ''

          if(getters.filterByNumSoporte(numSoporte1)) {
            commit('agregarDuplicado',venta)
          }
        })
        // console.log('duplicados length', getters.retornarDuplicados)
        commit('deleteDuplicados', newVentas)
        console.log('longitud de newVentas', getters.retornarNewVentas.length)
        if(getters.retornarNewVentas.length <= 0) {
          // console.log('condicion de parada 1', )
          commit('setError', true)
        }
        // if(getters.retornarNewVentas.length > 0) {
        //   console.log('condicion de parada 2', getters.retornarNewVentas)
        // }  
    },
    findByValorSoporte ({commit, getters}, valorSoporte1) {
      if(!getters.filterByValorSoporte(valorSoporte1)) {
      commit('setError', 'Venta no Encontrada')
      }
      else {
        commit('setVentaCargada', getters.filterByValorSoporte(valorSoporte1))
      }

    },
    findByDocumentId ({commit, getters}, documentId) {
      if(!getters.filterByDocumentId(documentId)) {
        commit('setError', 'Venta no Encontrada')
      } else {
        commit('setVentaCargada', getters.filterByDocumentId(documentId))
      }

    },
    findByNumSoporte ({commit, getters, state}, numSoporte1) {
      if(getters.filterByNumSoporte(numSoporte1) === null || getters.filterByNumSoporte(numSoporte1) === undefined) {

        commit('setError', 'Venta no Encontrada')
      } else {

        commit('setVentaCargada', getters.filterByNumSoporte(numSoporte1))
      }

    }, 
    updateValidateItem ({commit, getters}, id) 
    {
      // console.log('este es el id de la venta', id)
      firebase.database().ref('ventas').child(id).update({validate:true})
        .then((data) => {
          commit('updateVenta', getters.cargarVenta(id))
        })
        .catch(error => {
          console.log('este es el error',error)
        })

        // subiendo a users/validateItems
        // console.log('este es el id del usuario', getters.user.id)
        const venta = getters.cargarVenta(id)
        venta.validate = true
        firebase.database().ref('users').child(getters.user.id).child('ventas').child(id).set(venta)
    },
    validarSelect ({getters}) {

      getters.returnValidate.forEach(id => {
        firebase.database().ref('ventas').child(id).update({validate:true})
      })
    },  
    pagarSelect ({commit,getters}) {

      getters.returnPaid.forEach(id => {
        firebase.database().ref('ventas').child(id).update({paid:true})

        // subir a users/paiditems
        const venta = getters.cargarVenta(id)
        venta.paid = true
        firebase.database().ref('users').child(getters.user.id).child('ventas').child(id).set(venta)
      })
      commit('resetPaidList')
    },
    sendEmailsQr ({commit, getters}) {

      getters.returnSendEmailsList.forEach(id => {
        firebase.database().ref('ventas').child(id).update({sendEmail:true})
      })
      commit('resetEmailList')
    },
    // Users
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          firebase.database().ref('/users/' + user.uid + '/type').once('value')
            .then(data => {
              const typeUser = data.val()
              const key = data.key
              commit('setLoading', false)
              const newUser = {
                id: user.uid,
                type: typeUser
              }

              commit('setUser', newUser)
            })
            .catch(error => {
              console.log('primer error', error)
            })
        })
        .catch(error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
        })
    },
    autoSignIn ({commit}, payload) {

      commit('setUser', {
        id: payload.user.uid,
        type: payload.type
      })
    },
    signUserUp ({commit, dispatch}, payload) {
      firebase.database().ref('users')
        .push({
          type: payload.type,
          name: payload.name,
          email: payload.email,
          password: payload.password 
        })
    },  
    cargarVentas ({commit}, payload) {
      commit('ventasCargadas', payload)
    },
    onLogout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    clearVenta ({commit}) {
      commit('setVentaCargada', null)
    },

    // Users 
    getFirebaseUsers ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('/users/').once('value')
        .then(data => {
          const usuarios = []
          const obj = data.val()
          for (let key in obj) {
            usuarios.push({
              id: key, 
              emailUser: obj[key].email,
              nameUser: obj[key].name,
              typeUser: obj[key].type
            })
          }

          commit('setUsers', usuarios)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    changeUserPassword ({commit},payload) {
      firebase.database().ref('users').child(payload.uid).update(
        {
          password: payload.password
        }
      )
      .then((data) => {
        
      })
      .catch(error => {
        console.log('este es el error',error)
      })
    },
    deleteUser ({commit}, uid) {

      firebase.database().ref('users').child(uid).remove()
      commit('deleteUser', uid)
    },
    filterUsers ({commit, getters}, userType) {
      // console.log('userType', userType)
      const users = getters.users.filter(user => {
        return user.typeUser == userType
      })
      commit('setItemsUsers', users)
      // console.log('estos son los usuarios', users)
    },
    filterVentas ({commit}, uid) {
      firebase.database().ref('/users/' + uid + '/ventas').once('value')
        .then(data => {
          // console.log('data', data.val())
          const ventas = []
          const obj = data.val()
          for (let key in obj) {
            ventas.push({
              marcaTemporal: obj[key].marcaTemporal,
              nombreAsesor: obj[key].nombreAsesor,
              primerNombre: obj[key].primerNombre,
              segundoNombre: obj[key].segundoNombre,
              primerApellido: obj[key].primerApellido,
              segundoApellido: obj[key].segundoApellido,
              documentId: obj[key].documentId,
              tipoDeDocumento: obj[key].tipoDeDocumento, 
              fechaNacimiento: obj[key].fechaNacimiento, 
              telefonoFijo: obj[key].telefonoFijo, 
              telefonoCelular: obj[key].telefonoCelular, 
              paisResidencia: obj[key].paisResidencia, 
              departamento: obj[key].departamento, 
              ciudadResidencia: obj[key].ciudadResidencia, 
              dirResidencia: obj[key].dirResidencia, 
              email: obj[key].email, 
              ciudadOrigen: obj[key].ciudadOrigen, 
              ciudadDestino: obj[key].ciudadDestino, 
              idItem: obj[key].idItem,
              planVacacional: obj[key].planVacacional,
              fechaIda: obj[key].fechaIda, 
              fechaRegreso: obj[key].fechaRegreso,
              fechaActividad: obj[key].fechaActividad,
              precioNeto: obj[key].precioNeto,
              precioVenta: obj[key].precioVenta,
              numPasajerosAdultos: obj[key].numPasajerosAdultos, 
              numPasajerosNinos: obj[key].numPasajerosNinos, 
              numInfantes: obj[key].numInfantes, 
              soporte1: obj[key].soporte1, 
              numSoporte1: obj[key].numSoporte1,
              valorSoporte1: obj[key].valorSoporte1, 
              soporte2: obj[key].soporte2, 
              numSoporte2: obj[key].numSoporte2, 
              valorSoporte2: obj[key].valorSoporte2, 
              soporte3: obj[key].soporte3, 
              numSoporte3: obj[key].numSoporte3, 
              valorSoporte3: obj[key].valorSoporte3, 
              soporte4: obj[key].soporte4,
              numSoporte4: obj[key].numSoporte4,
              valorSoporte4: obj[key].valorSoporte4,
              soporte5: obj[key].soporte5,
              numSoporte5: obj[key].numSoporte5,
              valorSoporte5: obj[key].valorSoporte5,
              validate: obj[key].validate,
              paid: obj[key].paid,
              sendEmail: obj[key].sendEmail,
              id: key
              })
            }
            commit('setVentasFiltradas',ventas)
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  getters: { 
    cargarVentas (state) {
      return state.loadVentas
    },
    user (state) {
      return state.user
    },
    cargarCabeceraMenu (state) {
      return state.cabeceraMenu
    },
    cargarVenta (state) {
      return (id) => {
        return state.loadVentas.find((venta) => {
          return venta.id === id
        })
      }
    },
    getVentaCargada (state) {
      return state.ventaCargada
    },
    filterByValorSoporte (state, valorSoporte1) {
      return (valorSoporte1) => {
        return state.loadVentas.find((venta) => {
          return venta.valorSoporte1 === valorSoporte1
        })
      }
    },
    filterByDocumentId (state, documentId) {
      return (documentId) => {
        return state.loadVentas.find((venta) => {
          return venta.documentId === documentId
        })
      }
    },
    filterByNumSoporte (state, numSoporte1) {
      return (numSoporte1) => {
        return state.loadVentas.find((venta) => {
          return venta.numSoporte1 === numSoporte1
        })
      }
    },
    // shared
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    returnValidate (state) {
      return state.validateList
    },
    returnPaid (state) {
      return state.paidList
    },
    returnSendEmailsList (state) {
      return state.sendEmailList
    },
    numerosSoporte (state) {
      return state.listNumSoporte
    },
    // users
    users (state) {
      return state.users
    },
    // duplicados
    retornarDuplicados (state) {
      return state.ventasDuplicadas
    },
    retornarNewVentas (state) {
      return state.newVentas
    },
    retornarItemsUser (state) {
      return state.usersItemsFilter
    },
    retornarVentasFiltradasUsers (state) {
      return state.ventasFiltradasUsers
    }
  }
})
        