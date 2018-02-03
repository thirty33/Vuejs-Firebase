<template>
	<v-container>
      <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3 >
          <app-alert :text="error">

          </app-alert>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12 sm6 offset-sm3 class="text-xs-center text-sm-center">
          <h4 class="primary--text">BUSCAR VENTA:	</h4>
        </v-flex>
      </v-layout>

      <v-layout row class="mt-3"> 
        <v-flex xs12 lg12>
          <form @submit.prevent="sendRequest">
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3  v-if="!qrReader">
                <v-text-field
                  name="title"
                  label="Valor Soporte"
                  id="title"
                  v-model="valSoporte"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 v-if="!qrReader">
                <v-text-field
                  name="location"
                  label="Documento de identidad"
                  id="location"
                  v-model="documentId"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 sm6 offset-sm3 v-if="!qrReader">
                <v-text-field
                  name="description"
                  label="Numero soporte despegar"
                  id="description"
                  v-model="numSoporte"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="text-xs-center text-sm-right" v-if="!listenQrReader">
                <v-btn
                  v-if="buttonInit"
                  class="primary"
                  :disabled="formIsValid"
                  @click=""
                  type="submit"
                  >{{ textButtonFinder }}</v-btn>
                <v-btn
                  v-else=""
                  class="primary"
                  @click="toggleButtons"
                  >regresar</v-btn>
              </v-flex>
              <v-flex xs12 sm6 class="text-xs-center text-sm-left" 
                :class="{ 'text-xs-center text-sm-center offset-sm3' : listenQrReader }"
                >
                <v-btn
                  class="primary"
                  @click="changeQrCode">
                  {{ changeTextQr }}</v-btn>
              </v-flex>
              <v-flex xs12 sm6 class="text-xs-center text-sm-right" 
                :class="{ 'text-sm-center ml-5' : listenQrReader }"
                v-if="listenQrReader && paused">
                <v-btn
                  class="primary"
                  @click="regresar"
                  >
                  atras</v-btn>
              </v-flex>
            </v-layout>
          </form>
        </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-3" v-if="qrReader"> 
      <v-flex xs12>
        <qrcode-reader @decode="onDecode" :paused="paused" @init="onInit">

        </qrcode-reader>
      </v-flex>
    </v-layout>		
  </v-container>
</template>

<script>
	export default {
		data(){
			return {
				valSoporte: '',
				documentId: '',
				numSoporte: '',
				qrReader: false,
				buttonText: false,
				paused: false, 
				textQr: 'Escanear Qr',

        buttonInit: true
        
       
			}
		},
		computed: {
			listenQrReader () {
				return this.qrReader		
			},
			formIsValid () {
				
				if(this.valSoporte !== '' && this.documentId == '' && this.numSoporte == '') {
					return false
				} 
				if(this.valSoporte == '' && this.documentId !== '' && this.numSoporte == '') {
					return false
				} 
				if(this.valSoporte == '' && this.documentId == '' && this.numSoporte !== '') {
					return false
				} 
				return true
				
			},
			changeTextQr () {
				if (this.qrReader){
					return this.textQr = 'Busqueda general'
				}
				return this.textQr = 'Escanear Qr'	
			},
			textButtonFinder () {
				
				return this.textQr = 'Buscar'
			},
			error () {
				return this.$store.getters.error
			},
      
		},
		methods: {
			onDecode (content) {
        this.paused = true
				// console.log('esto es lo que captura el decode', content)
				this.$store.dispatch('findByNumSoporte', content)
				if(!this.$store.getters.getVentaCargada.id) {
					console.log('error')
					return
				}
				this.paused = false
        if (!this.error) {
				  this.$router.push('/movil/' + this.$store.getters.getVentaCargada.id)
        }
			},
			async onInit (promise) {
				// show loading indicator
				try {
				await promise
				// console.log('mostrando promise', promise)
				// successfully initialized
				} catch (error) {
				if (error.name === 'NotAllowedError') {
					// user denied camera access permisson
				} else if (error.name === 'NotFoundError') {
					// no suitable camera device installed
				} else if (error.name === 'NotSupportedError') {
					// page is not served over HTTPS (or localhost)
				} else if (error.name === 'NotReadableError') {
					// maybe camera is already in use
				} else if (error.name === 'OverconstrainedError') {
					// passed constraints don't match any camera. Did you requested the front camera although there is none?
				} else {
					// browser is probably lacking features (WebRTC, Canvas)
				}
				} finally {
				// hide loading indicator
				}
			},
			changeQrCode () {
				this.qrReader = !this.qrReader
				this.$store.dispatch('clearError')
				this.paused = false
			},
			toggleButtons () {
				this.$store.dispatch('clearError')
        this.buttonInit = true
        this.valSoporte =  ''
        this.documentId =  ''
        this.numSoporte =  ''
      },
			sendRequest () {
				if (this.valSoporte !== '') {
					this.$store.dispatch('findByValorSoporte', this.valSoporte)
					
				}
				if (this.documentId !== '') {
					this.$store.dispatch('findByDocumentId', this.documentId)
					
				}
				if (this.numSoporte !== '') {
					this.$store.dispatch('findByNumSoporte', this.numSoporte)
				}
				this.paused = false
        this.buttonInit = false
				if (!this.error){
				  this.$router.push('/movil/' + this.$store.getters.getVentaCargada.id)
				}
			},
			regresar () {
				this.$store.dispatch('clearError')
				this.paused = false
			}
		}
	}
</script>