<template>
  <v-app class="grey lighten-3">
    <v-toolbar dark class="yellow accent-2">
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <!-- <router-link to="/" tag="span" style="cursor: pointer">Jet Set</router-link> -->
      </v-toolbar-title>
      <img src="http://photos.jetsetviajesyturismo.com/i.ashx?&mid=102592370&mt=Photo&standardsize=256x93" width="100" height="" />
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" router :to="item.link" color="secondary">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout" color="secondary">
          <v-icon left>exit_to_app</v-icon>
            Salir
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>


    <!-- hamburg menu -->
    <v-navigation-drawer temporary v-model="sideNav" absolute>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link" >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ item.title }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Salir
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false

      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'lock_open', title: 'Entrar', link: '/signin'}
        ]
        // console.log('prueba11', this.returnTypeUser[0])
        if (this.userIsAuthenticated && this.returnTypeUser === 'SuperAdmin') {
          // console.log('entrando al primer if')
          menuItems = [
            {icon: 'folder_open', title: 'Data', link: '/data'},
            {icon: 'room', title: 'Buscador', link: '/movil'},
            {icon: 'supervisor_account', title: 'Crear Usuario', link: '/signup'},
            {icon: 'verified_user', title: 'Usuarios', link: '/usuarios'},
            {icon: 'event', title: 'Actividad', link: '/actividad'}
          ]
        }
        else if (this.userIsAuthenticated && (this.returnTypeUser === 'Asesor' || this.returnTypeUser === 'Contable')) {
          menuItems = [
             {icon: 'folder_open', title: 'Data', link: '/data'}
          ]
        }
        else if (this.userIsAuthenticated && this.returnTypeUser === 'Proveedor') {
          menuItems = [
            {icon: 'room', title: 'Buscador', link: '/movil'}
          ]
        }

        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      returnTypeUser () {
        if(this.userIsAuthenticated) {
          var user = this.$store.getters.user
          return user.type
        }
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('onLogout')
        this.$router.push('/signin')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>

