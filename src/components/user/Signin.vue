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
						<form @submit.prevent="onSignin">
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="email"
									label="Mail"
									id="email"
									v-model="email"
									type="email"
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
									<v-btn type="submit" :disabled="loading" :loading="loading">Entrar
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
				
			}
		},
		methods: {
			onSignin () {
				this.$store.dispatch('signUserIn',{
					email: this.email,
					password: this.password
				})		
			},
			onDismissed () {

				this.$store.dispatch('clearError')
			}
		},
		computed: {
			
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
      
			user (value) {
				if (value !== null && value !== undefined) {
					const user = this.user
					if(user.type === 'Proveedor') {
						this.$router.push('/movil')
					}
					else this.$router.push('/data')
				}
      }
    }
  }
</script>