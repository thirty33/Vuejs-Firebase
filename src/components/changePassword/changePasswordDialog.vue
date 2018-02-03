<template>
  <v-dialog  persistent v-model="registerDialog">
    <v-btn primary accent slot="activator">
        Cambiar
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Cambiar contrasena</v-card-title>
            <!-- <v-card-title v-else>Register from Meetup?</v-card-title> -->
          </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <v-text-field
                name="password"
                label="Password"
                v-model="password"
                type="password"
                >
                </v-text-field>
                
            </v-flex>
        </v-layout>

        <v-layout row>
            <v-flex xs12>
                <v-text-field
                name="confirmPassword"
                label="Confirmar password"
                v-model="confirmPassword"
                type="password"
                :rules="[comparePasswords]">
                </v-text-field>
                
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
              :disabled="password !== confirmPassword || confirmPassword == '' || password == '' || password.length < 6"
              @click="changePassword"
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
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      comparePasswords () {
        return this.password !== this.confirmPassword ? 'las claves no coinciden' : ''
      }
    },
    methods: {
      changePassword () {
        
        const obj = {
            uid: this.uid,
            password: this.password
        }
        this.registerDialog = false
        this.$store.dispatch('changeUserPassword', obj)
      }
    }
  }


</script>


<style>


</style>
