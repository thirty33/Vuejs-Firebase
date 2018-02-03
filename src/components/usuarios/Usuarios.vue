<template>
  <v-container>
    <v-layout row class="text-md-center">
      <v-flex>
        <v-card>
          <v-card-title>
            Usuarios
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Buscar"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-bind:headers="headers"
              v-bind:items="users"
              v-bind:search="search"
            >
            <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.nameUser }}</td>
              <td class="text-xs-right">{{ props.item.emailUser }}</td>
              <td class="text-xs-right">{{ props.item.typeUser }}</td>
              <!-- <td class="text-xs-right">{{ props.item.changePassword }}</td> -->
              <td class="text-xs-right">
                <!-- <v-btn color="primary" dark @click="cambiarPassword">Cambiar</v-btn> -->
                  <change-password-dialog
                    :uid="props.item.id"
                  >
                  </change-password-dialog> 
              </td>
              <!-- <td class="text-xs-right">{{ props.item.deleteUser }}</td> -->
              <td class="text-xs-right">
                <delete-user-dialog
                  :uid="props.item.id"
                ></delete-user-dialog>
              </td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
          <!-- <pre>{{ users }}</pre> -->
          <v-card-actions>
            <v-spacer></v-spacer>
              <!-- <change-password-dialog>
              </change-password-dialog>  -->
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>  
 
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('getFirebaseUsers')
  },
  data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          { text: 'Nombre Usuario', sortable: false, value: 'nameUser' },
          { text: 'Correo', sortable: false, value: 'emailUser' },
          { text: 'Tipo Usuario', sortable: false, value: 'typeUser' },
          { text: 'Cambiar Contrasena', sortable: false, value: 'changePassword' },
          { text: 'Eliminar Usuario', sortable: false, value: 'deleteUser' }
        ],
        items: [
        {
          nameUser: 'joel',
          emailUser: 'correo@corre.com',
          typeUser: 'SuperAdmin',
          changePassword: false,
          deleteUser: false
        },
        {
          nameUser: 'gustavo',
          emailUser: 'correo@corre.com',
          typeUser: 'SuperAdmin',
          changePassword: false,
          deleteUser: false
        }
       
      ]
    }
  },
  computed: {
    users () {
      const usuarios = this.$store.getters.users
      return usuarios
      // console.log('usuarios vista', usuarios)
      // this.$store.dispatch('getFirebaseUsers')
    }
  },
  methods: {
    
  }
}
</script>

<style>

</style>

