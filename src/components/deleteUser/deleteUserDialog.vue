<template>
  <v-dialog  persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
        Borrar
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>¿Esta seguro de borrar este usuario?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
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
              @click="deleteUser"
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
    props: ['uid'],
    created () {},
    data () {
      return {
        registerDialog: false,
        block: true,
       
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'las claves no coinciden' : ''
      }
    },
    methods: {
      deleteUser () {
        this.$store.dispatch('deleteUser', this.uid)
        this.registerDialog = false
      }
    }
  }


</script>


<style>


</style>
