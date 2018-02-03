<template>
  <v-container>
     <h1>Detalle de la venta:</h1> 
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <!-- <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular> -->
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h2 class=""> Primer Nombre: {{ venta.primerNombre }}.</h2>
          </v-card-title>
          <v-card-text>
            <h3 class="mb-2"> Segundo Nombre: {{ venta.segundoNombre }}.</h3>
            <h3 class="mb-2"> Primer Apellido: {{ venta.primerApellido }}.</h3>
            <h3 class="mb-2"> Segundo Apellido: {{ venta.segundoApellido }}.</h3>
            <h3 class="mb-2">Cedula de Identidad: {{ venta.documentId }}.</h3>
            <h3 class="mb-2">Id de venta: {{ venta.idItem }}.</h3>
            <h3 class="mb-2">Numero de soporte despegar: {{ venta.numSoporte1 }}.</h3>
            <h3>Correo: {{ venta.email }}.</h3>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
              <app-validate-dialog
              :id="venta.id"
              v-if="!ventaEstaValidada">
              </app-validate-dialog> 
              <v-btn
              color="primary"
              dark
              @click="regresar">
                Regresar

              </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    data () {
      return {
      }
    }, 
    computed: {
      venta () {
        return this.$store.getters.cargarVenta(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      loading () {
        return this.$store.getters.loading
      },
      ventaEstaValidada () {
        if(this.$store.getters.cargarVenta(this.id)) {
          let venta = this.$store.getters.cargarVenta(this.id)
          return venta.validate 
        }
      }  
    },
    methods: {
      regresar () {
        this.$store.dispatch('clearVenta')
        this.$router.push('/movil/')
      }
    }
  }
</script>
