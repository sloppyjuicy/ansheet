<template>
    <b-navbar toggleable="lg" type="light" variant="primary">
        <b-navbar-brand>Template</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <router-link to="/" tag="b-nav-item">Inicio</router-link>
            <router-link to="/about" tag="b-nav-item">About</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form> -->

            <!-- <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
            <-/-Using 'button-content' slot-/-> 
            <template v-slot:button-content>
                <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown> -->
            <router-link 
                to="/login" 
                tag="b-nav-item"
                v-if="!this.$store.getters.isUserLogin">
                Iniciar sesión
            </router-link>
            <b-nav-item v-else @click="logout"> Cerrar sesión </b-nav-item>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    methods:{
        logout(){
            this.$store.dispatch("LOGOUT")
            .then( () =>{
                console.log("it works from logout");
                this.$router.push("/")
            })
        }
    }
}
</script>