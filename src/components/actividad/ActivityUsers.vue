<template>
  <v-container>
    <v-layout row class="mt-3 mb-4 text-xs-center">
      <v-flex>
        <h4 class="primary--text">ACTIVIDAD DE LOS USUARIOS:</h4>
      </v-flex>
    </v-layout>
    <v-layout row class="mb-3">
      <v-flex xs12 sm6>
        <v-card>
          <v-card-actions>
            <v-select label="tipo Usuario" :items="typeUsersItems" v-model="userType"></v-select>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-actions>
            <v-select label="Usuario" :items="returnUsersItems" v-model="userId"></v-select>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout class="mt-3 text-xs-center">
      <v-flex xs12>
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
                @click="changeSort(header.value)"
              >
                <v-icon>arrow_upward</v-icon>
                {{ header.text }}
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
              <td class="text-xs-right">
                <img src="../../../static/check-true.png" v-if="props.item.validate" />
                <img src="../../../static/check-false.png" v-else />
              </td>
              <td class="text-xs-right">
                <img src="../../../static/check-false.png" v-if="!props.item.paid" />
                <img src="../../../static/check-true.png" v-else/>
              </td>
              <td class="text-xs-center">
                <img src="../../../static/check-true.png" v-if="props.item.sendEmail" />
                <img src="../../../static/check-false.png" v-else />
              </td>
            </tr>
          </template>
        </v-data-table>
    </v-card> 
      </v-flex> 
    </v-layout>
    <v-layout row class="mt-3 text-xs-center">
      <v-flex>
       <v-btn
        @click="ventasSelect"
       >Filtrar</v-btn>
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
      userType: '',
      userId: '',
      pagination: {
        sortBy: 'documentId'
      },
      search: '',
      max25chars: (v) => v.length <= 25 || 'Input too long!',
      tmp: '',
      typeUsersItems: [
        {text: 'Proveedor', value: 'Proveedor'},
        {text: 'Contable', value: 'Contable'}
      ],
      usersItems: []
    }
  },
  computed: {
    returnUsersItems () {
      return this.$store.getters.retornarItemsUser
    },
    cabeceraMenu () {
      return this.$store.getters.cargarCabeceraMenu
    },
    ventas () {
      return this.$store.getters.retornarVentasFiltradasUsers
    }
  },
  watch: {
    userType: function () {
      this.filtrarData()
    }
  },
  methods: {
    filtrarData () {
      this.$store.dispatch('filterUsers', this.userType)
    },
    ventasSelect () {
      // console.log('user id', this.userId)
      this.$store.dispatch('filterVentas', this.userId)
    }
  }
}

</script>

<style>

</style>
