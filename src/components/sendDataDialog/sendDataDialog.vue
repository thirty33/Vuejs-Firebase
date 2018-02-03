<template>
  <v-dialog  persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
        Enviar
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap v-if="duplicates">
          <v-flex xs12>
            <app-alert :text="error">
            </app-alert>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="listenVentas === ''">
          <v-flex xs12>
            <v-card-title>No ha colocado un archivo</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="listenVentas !== ''">
          <v-flex xs12>
            <v-card-title v-show="!duplicates">{{ secureMsg }}</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="listenMsg !== ''">
          <v-flex xs12>
            <v-card-title>{{ listenMsg }}</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
              class="red--text darken-1"
              flat  
              @click="cancelarEvento">
                Cancelar
              </v-btn>
              <v-btn
              class="green--text darken-1"
              flat
              @click="enviarData"
              :disabled="listenVentas === '' || duplicates || listenMsg !== ''"
              > Confirmar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import EventBus from '../bus'
  export default {
    props: ['ventas'],
    created () {},
    data () {
      return {
        registerDialog: false,
        block: true,
        error: 'elementos duplicados',
        msg: '',
        secureMsg: 'esta seguro de querer enviar estos datos?'
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'las claves no coinciden' : ''
      },
      listenVentas () {
        return this.ventas
      },
      duplicates () {
        return this.$store.getters.error
      },
      listenMsg () {
        return this.msg
      }
    },
    methods: {
      enviarData () {
        this.$store.dispatch('compararVentas', this.ventas)
        if(!this.duplicates) {
          // console.log('no hay duplicados')
          this.$store.dispatch('createDataBase', this.$store.getters.retornarNewVentas)
          this.$store.dispatch('loadDataBase') 
          this.msg = 'ventas cargadas con exito'
          this.secureMsg = ''
        }
      },
      cancelarEvento () {
        this.registerDialog = false
        this.secureMsg = 'esta seguro de querer enviar estos datos?'
        this.msg = ''
        const obj = []
        this.$store.commit('setDuplicados', obj)
        EventBus.$emit('resetFields')
        this.$store.commit('setError', null)
      }
    }
  }
</script>


<style>


</style>
