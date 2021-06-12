<template>
    <b-container fluid class="pt-4">
        <b-row>
            <b-col md="6" offset-md="3" class="vh-center">
                <b-card>
                    <b-card-title class="text-center">Inicia sesión</b-card-title>
                    <b-form>
                        <b-form-group
                            id="input-group-1"
                            label="Correo electrónico:"
                            label-for="input-1"
                            description="We'll never share your email with anyone else."
                        >
                            <b-form-input
                            id="input-1"
                            type="email"
                            required
                            placeholder="rod@ludomatics.mx"
                            v-model="email"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Contraseña:" label-for="input-2">
                            <b-form-input
                            id="input-2"
                            required
                            type="password"
                            v-model="password"
                            ></b-form-input>
                        </b-form-group>
                        <div class="text-center">
                            <b-button type="submit" variant="primary" @click.prevent="login">Ingresar</b-button>
                        </div>
                    </b-form>
                    <template v-slot:footer>
                        
                        <b-row>
                            <b-col cols="auto" class="mr-auto">
                                <em><a href="#">¿Olvidaste tú contraseña?</a></em>
                            </b-col>
                            <b-col cols="auto">
                                ¿Aún no tienes una cuenta? <a href="#">Registrate aquí</a>
                            </b-col>
                        </b-row>
                    </template>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data: () => ({
        email: '',
        password: ''
    }),
    methods:{
        login(){
            //Check email and pass not EMPTY
            // Check valid email 
            this.$store.dispatch("LOGIN",{
                email: this.email,
                password: this.password
            })
            .then(success => {
                console.log("@LoginForm", success);
                this.$router.push("/")
            })
            .catch( (message) => {
                console.log("@LoginForm.error", message);
            })
            
        }
    }
}
</script>

<style scoped>
.vh-center {
  margin: 0;
  position: absolute;
  top: 40%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>