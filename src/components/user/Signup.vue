<template>
	<v-container>
		<v-layout row v-if="error">
			<v-flex xs12 sm6 offset-sm3 >
				<app-alert @dismissed="onDismissed" :text="error.message">

				</app-alert>
			</v-flex>

		</v-layout>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<v-card-text>
					<v-container>
						<form @submit.prevent="onSignup">
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="nombre"
									label="Nombre completo"
									id="nombre"
									v-model="nameUser"
									type="text"
									required>
									</v-text-field>
									
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="email"
									label="Direccion correo"
									id="email"
									v-model="email"
									type="email"
									:rules="[validateEmail]"
									required>
									</v-text-field>
									
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="password"
									label="Password"
									id="password"
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
									id="confirmPassword"
									v-model="confirmPassword"
									type="password"
									:rules="[comparePasswords]">
									</v-text-field>
									
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-select
										v-bind:items="typeUsers"
										v-model="userType"
										label="tipo Usuario"
										single-line
										bottom
									></v-select>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-btn type="submit" :disabled="!formIsValid">Crear Usuario
										<span slot="loader" class="custom-loader">
											<v-icon light>cached</v-icon>
										</span>
									</v-btn>
								</v-flex>
							</v-layout>
						</form>
					</v-container>
				</v-card-text>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data(){
			return {
				email: '',
				password: '',
				confirmPassword: '',
				typeUsers: [
					{ text: 'SuperAdmin' },
					{ text: 'Asesor' },
					{ text: 'Contable' },
					{ text: 'Proveedor' },
				],
				userType: '',
				nameUser: ''
			}
		},
		methods: {
			onSignup () {
				this.$store.dispatch('signUserUp',{
					email: this.email,
					password: this.password,
					name: this.nameUser,
					type: this.userType.text
				})		
			},
			onDismissed () {
				console.log('Dismissed Alert')
				this.$store.dispatch('clearError')
			}
		},
		computed: {
			formIsValid () {
				return this.email !== '' &&
				this.password !== '' &&
				this.confirmPassword !== '' &&
				this.userType !== '' &&
				this.password.length >= 6 &&
				this.comparePasswords === '' &&
				this.validateEmail === ''
			},
			comparePasswords () {
				return this.password !== this.confirmPassword ? 'Password do not match' : ''
			},
			validateEmail () {
				var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
				return re.test(this.email.toLowerCase()) ? '' : 'email no valido'
			},
			user () {
				return this.$store.getters.user
			},
			error () {
				return this.$store.getters.error
			},
			loading () {
				return this.$store.getters.loading
			}
		},
		watch: {
			// si el sigUp ha sido exitoso
			user (value) {
				if (value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		}

	}
</script>

<style scoped>

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }


</style>
