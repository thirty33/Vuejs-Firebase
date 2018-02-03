<template>
      <v-card> 
        <v-card-title>
        Ventas
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="busqueda"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          
          v-bind:headers="cabeceraMenu"
          v-bind:items="ventas"
          select-all
          v-bind:pagination.sync="pagination"
          item-key="name"
          class="elevation-1"
          v-bind:search="search"
          
        >
          <template slot="headers" slot-scope="props">
            <tr>
              <th>
                <!-- <v-checkbox
                  primary
                  hide-details
                  @click.native="toggleAll"
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                ></v-checkbox> -->
              </th>
              <th v-for="header in props.headers" :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              >
                <!-- <v-icon>arrow_upward</v-icon> -->
                {{ header.text }}
                <button
                  class="btn-class"
                  v-if="header.text === 'correo qr'"
                  @click="toggleAll('sendEmail')"
                >
                  todo
                </button>
                <button
                  class="btn-class"
                  v-if="header.text === 'pagar'"
                  @click="toggleAll('paid')"
                >
                  todo
                </button>
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <!-- <v-checkbox
                  primary
                  hide-details
                  :input-value="props.selected"
                ></v-checkbox> -->
              </td>
              <td>{{ props.item.marcaTemporal }}</td>
              <td class="text-xs-right">{{ props.item.nombreAsesor }}</td>
              <td class="text-xs-right">{{ props.item.primerNombre }}</td>
              <td class="text-xs-right">{{ props.item.segundoNombre }}</td>
              <td class="text-xs-right">{{ props.item.primerApellido }}</td>
              <td class="text-xs-right">{{ props.item.segundoApellido }}</td>
              <td class="text-xs-right">{{ props.item.documentId }}</td>
              <td class="text-xs-right">{{ props.item.tipoDeDocumento }}</td>
              <td class="text-xs-right">{{ props.item.fechaNacimiento }}</td>
              <td class="text-xs-right">{{ props.item.telefonoFijo }}</td>
              <td class="text-xs-right">{{ props.item.telefonoCelular }}</td>
              <td class="text-xs-right">{{ props.item.paisResidencia }}</td>
              <td class="text-xs-right">{{ props.item.departamento }}</td>
              <td class="text-xs-right">{{ props.item.ciudadResidencia }}</td>
              <td class="text-xs-right">{{ props.item.dirResidencia }}</td>
              <td class="text-xs-right">{{ props.item.email }}</td>
              <td class="text-xs-right">{{ props.item.ciudadOrigen }}</td>
              <td class="text-xs-right">{{ props.item.ciudadDestino }}</td>
              <td class="text-xs-right">{{ props.item.idItem }}</td>
              <td class="text-xs-right">{{ props.item.planVacacional }}</td>
              <td class="text-xs-right">{{ props.item.fechaIda }}</td>
              <td class="text-xs-right">{{ props.item.fechaRegreso }}</td>
              <td class="text-xs-right">{{ props.item.fechaActividad }}</td>
              <td class="text-xs-right">{{ props.item.precioNeto }}</td>
              <td class="text-xs-right">{{ props.item.precioVenta }}</td>
              <td class="text-xs-right">{{ props.item.numPasajerosAdultos }}</td>
              <td class="text-xs-right">{{ props.item.numPasajerosNinos }}</td>
              <td class="text-xs-right">{{ props.item.numInfantes }}</td>
              <td class="text-xs-right">{{ props.item.soporte1 }}</td>
              <td class="text-xs-right">{{ props.item.numSoporte1 }}</td>
              <td class="text-xs-right">{{ props.item.valorSoporte1 }}</td>
              <td class="text-xs-right">{{ props.item.soporte2 }}</td>
              <td class="text-xs-right">{{ props.item.numSoporte2 }}</td>
              <td class="text-xs-right">{{ props.item.valorSoporte2 }}</td>
              <td class="text-xs-right" :class="{ 'changeDisplay' : disValidate }">
                <!-- <input type="checkbox"
                  v-model="props.item.validate" 
                  @click="matrizValidate(props.item)"
                  :disabled="props.item.validate || userType === 'Contable'" 
                />  -->
                <!-- <label class="control control--checkbox">
                  <input type="checkbox" checked="checked"
                    v-model="props.item.validate" 
                    @click="matrizValidate(props.item)"
                    :disabled="props.item.validate || userType === 'Contable'"
                  />
                  <div class="control__indicator" style="margin-left:26px;"></div>
                </label> -->
                <img src="../../../static/check-true.png" v-if="props.item.validate" />
                <img src="../../../static/check-false.png" v-else />
              </td>
              <td class="text-xs-right" :class="{ 'changeDisplay' : disPaid }">
                <!-- <input type="checkbox" id="checkbox"
                  v-model="props.item.paid" 
                  @click="matrizPaid(props.item)"
                  :disabled="props.item.paid || props.item.validate == false"
                /> -->
                <img src="../../../static/check-false.png" v-if="!props.item.validate" />
                <label class="control control--checkbox" v-else-if="props.item.validate && !props.item.paid ">
                  <input
                    type="checkbox" 
                    checked="checked"
                    v-model="props.item.paid" 
                    @click="matrizPaid(props.item)"
                    />
                  <div class="control__indicator" style="margin-left:26px;"></div>
                </label>
                <img src="../../../static/check-true.png" v-else/>
              </td>
              <td class="text-xs-center" :class="{ 'changeDisplay' : disSend }">
                <!-- <input type="checkbox" id="checkbox"
                  v-model="props.item.sendEmail" 
                  @click="matrizSendEmail(props.item)"
                  :disabled="props.item.sendEmail"
                /> -->
                <img src="../../../static/check-true.png" v-if="props.item.sendEmail" />
                <label class="control control--checkbox" v-else>
                  <input type="checkbox" checked="checked"
                    v-model="props.item.sendEmail" 
                    @click="matrizSendEmail(props.item)"
                    :disabled="props.item.sendEmail"
                  />
                  <div class="control__indicator" style="margin-left:26px;"></div>
                </label>
              </td>
            </tr>
          </template>
        </v-data-table>
    </v-card> 
</template>


<script>
  import Vue from 'vue'
  import EventBus from '../bus'
export default {
  props:['dataInit'],
  created() {
    EventBus.$on('changeData', (data) => {
       this.dataFilter = data 
    })
  },
  data () {
    return {
      dataFilter: [],
      pagination: {
        sortBy: 'documentId'
      },
      validateList: [],
      paidList: [],
      sendEmailList: [],
      search: '',
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      busquedaQr: '',
      typeUser: null,
      disValidate: false,
      disPaid: false,
      disSend: false,
      validateItem: true
    }
  },
  computed: {
    userType () {
      if(this.$store.getters.user) {
        const user  = this.$store.getters.user
        // console.log('entrado al if', user) 
        this.typeUser = user.type
        if (this.typeUser === "Contable") {
          this.disSend = true
        }
        else if (this.typeUser === "Asesor") {
          this.disValidate = true
          this.disPaid = true
        }
        return this.typeUser
      }
    },
    ventas () {
      return this.dataFilter
    },
    cabeceraMenu () {
      if (this.$store.getters.user){
        // console.log('cantidad de items',this.$store.getters.cargarCabeceraMenu.length )
        var mainList = this.$store.getters.cargarCabeceraMenu
        var auxList = []
        // si es contable, las cabeceras cambian
        if(this.userType === "Contable") {
          const list1 = mainList.slice(0,36)
          // const list2 = mainList.slice(35,36)
          auxList = list1
          // console.log('lista auxiliar', auxList)
          return auxList
        }
        // si es Asesor, las cabeceras cambian
        else if(this.userType === "Asesor") {
          const list1 = mainList.slice(0,34)
          const list2 = mainList.slice(36,37)
          auxList = list1.concat(list2)
          // console.log('lista auxiliar', auxList)
          return auxList
        }
      }
      return this.$store.getters.cargarCabeceraMenu
    },
    selected () {
      return this.selected
    }    
  },
  methods: {
    toggleAll (itemProp) {
      // if (this.selected.length) this.selected = []
      // else this.selected = this.items.slice()
      this.$store.commit('toggleAll', itemProp)
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    matrizValidate (venta) {
      // this.validateList.push(id)
      if (!this.$store.state.validateList.find(id => { return id === venta.id }) && venta.validate == false) {
       this.$store.state.validateList.push(venta.id)
      }
      if (this.$store.state.validateList.find(id => { return id === venta.id }) && venta.validate == true) {
        let index = this.$store.state.validateList.indexOf(venta.id)
        this.$store.state.validateList.splice(index,1)
      }
      venta.validate = !venta.validate
      // console.log('esta es la lista de validate', this.$store.state.validateList)
    },
    matrizPaid (venta) {
      if (!this.$store.state.paidList.find(id => { return id === venta.id }) && venta.paid == false) {
        this.$store.state.paidList.push(venta.id)
      }
      if (this.$store.state.paidList.find(id => { return id === venta.id }) && venta.paid == true) {
        let index = this.$store.state.paidList.indexOf(venta.id)
        this.$store.state.paidList.splice(index,1)
      }
      venta.paid = !venta.paid
      // console.log('esta es la lista de pagados', this.$store.state.paidList)
    },
    matrizSendEmail (venta) {
      if (!this.$store.state.sendEmailList.find(id => { return id === venta.id }) && venta.sendEmail == false) {
        this.$store.state.sendEmailList.push(venta.id)
      }
      if (this.$store.state.sendEmailList.find(id => { return id === venta.id }) && venta.sendEmail == true) {
        let index = this.$store.state.sendEmailList.indexOf(venta.id)
        this.$store.state.sendEmailList.splice(index,1)
      }
      venta.sendEmail = !venta.sendEmail
      // console.log('esta es la lista de envio correos', this.$store.state.sendEmailList)
      
    }
  }  
}
</script>

<style lang="stylus" scoped>

.changeDisplay 
    display none
  

$color--white = #FFFFFF
$color--black = #000000
$color--light-grey = #E6E6E6
$color--grey = #CCCCCC
$color--dark-grey = #7B7B7B
$color--primary = #2AA1C0
$color--secondary = #0E647D


// Basic control styles
.control
  display block
  position relative
  padding-left 30px
  margin-bottom 15px
  cursor pointer
  font-size 18px
  
  // Hide default browser input
  input
    position absolute
    z-index -1
    opacity 0
    

// Custom control
.control__indicator
  position absolute
  top 2px
  left 0
  height 20px
  width 20px
  background $color--light-grey
  
  .control--radio &
    border-radius 50% // Makes radio buttons circlular
  
  // Hover and focus
  .control:hover input ~ &,
  .control input:focus ~ &
    background $color--grey
  
  // Checked
  .control input:checked ~ &
    background $color--primary

  // Hover when checked
  .control:hover input:not([disabled]):checked ~ &,
  .control input:checked:focus ~ &
    background $color--secondary
  
  // Hide default browser input
  .control input:disabled ~ &
    background $color--light-grey
    opacity 0.6
    pointer-events none

  &:after
    content ''
    position absolute
    display none // Hide check

    .control input:checked ~ &
      display block // Show check
 
    // Checkbox tick
    .control--checkbox &
      left 8px
      top 4px
      width 3px
      height 8px
      border solid $color--white
      border-width 0 2px 2px 0
      transform rotate(45deg)
    
    // Disabled tick colour
    .control--checkbox input:disabled ~ &
      border-color $color--dark-grey

    // Radio button inner circle
    .control--radio &
      left 7px
      top 7px
      height 6px
      width 6px
      border-radius 50%
      background $color--white

    // Disabled circle colour
    .control--radio input:disabled ~ &
      background $color--dark-grey
      
.select
  position relative
  display inline-block
  margin-bottom 15px
  width 100%

  select
    display inline-block
    width 100%
    cursor pointer
    padding 10px 15px
    outline 0
    border 0
    border-radius 0
    background $color--light-grey
    color $color--dark-grey
    appearance none
    -webkit-appearance none
    -moz-appearance none
    
    &::-ms-expand
      display none
    
    &:hover,
    &:focus
      color $color--black
      background $color--grey
  
    &:disabled
      opacity 0.5
      pointer-events none
      
.select__arrow
  position absolute
  top 16px
  right 15px
  width 0
  height 0
  pointer-events none
  border-style solid
  border-width 8px 5px 0 5px
  border-color $color--dark-grey transparent transparent transparent
  
  .select select:hover ~ &
  .select select:focus ~ &
    border-top-color $color--black
  
  .select select:disabled ~ &
    border-top-color $color--grey

.btn-class
    display block
    margin-left 4px
    border none
    color #FFFDFD
    border-radius 3px 3px 3px 3px
    -webkit-border-radius 3px 3px 3px 3px
    -moz-border-radius 3px 3px 3px 3px
    font-family Verdana
    width auto
    height auto
    font-size 12px
    padding 5px 8px
    box-shadow inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D,0 2px 4px 0 #D4D4D4
    -moz-box-shadow inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D,0 2px 4px 0 #D4D4D4
    -webkit-box-shadow inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D,0 2px 4px 0 #D4D4D4
    text-shadow 0 1px 0 #FFFFFF
    background-color #502DFC

.btn-class:hover, .btn-class:active
    border none
    color #705D07
    box-shadow inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D
    -moz-box-shadow inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D
    -webkit-box-shadow inset 0 1px 0 0 #FFF6CE,inset 0 -1px 0 0 #E3C852,inset 0 0 0 1px #FCE88D
    background-color #A9AEFC
</style>
