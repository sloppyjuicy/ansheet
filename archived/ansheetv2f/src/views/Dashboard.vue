<template>
    <b-container class="pt-4">
        <b-row>
            <b-col>
                <h2>Bienvenido de vuelta, Rodrigo</h2>
                <h4>Curso de preparación para ingreso a media superior</h4>
                <b-progress :value="value" :max="max" show-value class="mb-3"></b-progress>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-nav pills align="center">
                    <b-nav-item 
                        :active="navStep == 1"
                        @click="navStep = 1"
                    >Exámenes pendientes
                    </b-nav-item>
                    <b-nav-item 
                        :active="navStep == 2"
                        @click="navStep = 2"
                    >Exámenes realizados
                    </b-nav-item>
                    <b-nav-item 
                        :active="navStep == 3"
                        @click="navStep = 3"
                    >Estádisticas
                    </b-nav-item>
                </b-nav>
            </b-col>
        </b-row>
        <b-row v-if="navStep == 1">
            <b-container class="pt-5">
            <b-row  >
                <b-col md="4">
                    <b-card
                        title="Examen de simulación 5"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                    >
                        <b-card-text class="text-muted">
                            ¡Buena suerte!
                        </b-card-text>

                        <b-button href="#" variant="outline-primary">Realizar ahora</b-button>                        
                    </b-card>
                </b-col>
                <b-col md="4">Soy Rod</b-col>
            </b-row>
            </b-container>
            
        </b-row>
        <b-row v-if="navStep == 2">
            <v-col >
                HEllO 2
            </v-col>
        </b-row>
        <b-row v-if="navStep == 3">
            <v-col >
                By
            </v-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    data: () => ({
        navStep : 1,
        value: 45,
        max: 100
    })
}
</script>
