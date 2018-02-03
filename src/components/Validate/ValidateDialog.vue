<template>
  <v-dialog  persistent v-model="registerDialog">
    <v-btn primary accent slot="activator"
    
    >

      
      Validar  
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Validar venta?</v-card-title>
            <!-- <v-card-title v-else>Register from Meetup?</v-card-title> -->
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>

          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <!-- <v-card-text>You can always change your decision later on</v-card-text> -->
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
              class="red--text darken-1"
              flat
              @click="registerDialog = false">
                Cancelar

              </v-btn>
              <v-btn
              class="green--text darken-1"
              flat
              @click="validarVenta"
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
    props: ['id'],
    created () {},
    data () {
      return {
        registerDialog: false,
        block: true,
        idVenta: this.id
      }
    },
    computed: {
      
    },
    methods: {
      validarVenta () {
          this.registerDialog = false
          this.$store.dispatch('updateValidateItem', this.id)
          // this.$router.push('/movil/')
      }
    }
  }


</script>


<style>


</style>
