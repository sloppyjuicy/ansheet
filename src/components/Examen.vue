<template>
    <div class="container-xl py-4">
        <div class="row">
            <div class="col-md-12">
                <h4>Examen de simulación</h4>
                <h5>{{examen.institucion}} {{examen.annio}} {{examen.area}}</h5>
            </div>
        </div>
        <form class="pb-3" v-if="!examenTerminado">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                <input type="text" class="form-control" placeholder="Nombre" 
                v-model="datosAlumno.nombre" >
                </div>
                <div class="col-md-6 col-sm-12">
                <input type="text" class="form-control" placeholder="Apellidos" 
                v-model="datosAlumno.apellidos">
                </div>
            </div>
        </form>
        <div v-else>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h5>{{datosAlumno.nombre}} {{datosAlumno.apellidos}}</h5>
                    </div>
                    <div class="col-md-6 text-center">
                        <h6>Aciertos totales: {{aciertos}}</h6>
                    </div>
                </div>
                <div class="row" v-for="aciertosM in aciertosPorMateria" :key="aciertosM.nombre">
                    <div class="col-md-2">
                        <h6>{{aciertosM.nombre}}</h6>
                    </div>
                    <div class="col-md-8">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" :style="{width: aciertosM.porcentaje+'%'}"
                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                {{aciertosM.aciertos}} /
                                {{aciertosM.numReactivos}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 multicol">
                <ol>
                    <div v-for="i in examen.numReactivos" :key="i">
                        <div v-for="materia in examen.materias" :key="materia.nombre">
                                <label v-if="i == materia.inicio">{{materia.nombre}}</label>
                            </div>
                        <li>
                            <div v-for="n in examen.numOpciones" :key="n" class="d-inline mr-1">
                                <label class="mr-1">{{String.fromCharCode(64+n)}}</label>
                                <input type="radio" :name="'test-'+i" :disabled="examenTerminado" 
                                :value="String.fromCharCode(64+n)" 
                                v-model="respuestas[i-1]" v-if="respuestas" >
                            </div>
                            <label v-if="examenTerminado">&#x2714;</label>
                        </li>
                    </div>
                    
                </ol>
            </div>
            <div class="col-md-4 offset-md-4 text-center mt-2">
                <button type="button" class="btn btn-outline-primary btn-block" 
                @click="terminar">Terminar</button>
            </div>
        </div>
    </div>
</template>        

<script>
    import examen from "../canswers/unam2020area3.json";
export default {
    name:'Examen',
    data(){
        return {
            examen : examen,
            examenTerminado : false,
            respuestas : null,
            datosAlumno :{
                nombre : 'Rodrigo',
                apellidos : 'Francisco'
            },
            aciertos : 0,
            aciertosPorMateria: []
        }
    },
    mounted(){
        this.respuestas =  new Array(examen.numReactivos).fill('')     
        /*const {inicio,fin, ...tmp} = examen.materias[1]; 
            Es una buena solución para copiar un objeto sin algunas propiedades
            pero Vue JS no lo permite porque inicio y fin no se vuelven a ocupar.
        */
       for (const materia of examen.materias) {
           const tmp = {
               "nombre" : materia.nombre,
               "numReactivos": materia.numReactivos,
               "aciertos" :0,
               "porcentaje" : 0
           }
           this.aciertosPorMateria.push(tmp);
       }
        // Validar si se cargo bien el examen.   
    },
    methods :{
        terminar(){
            // Validar si lleno el nombre y si contesto todo
            this.calificarExamen();
            this.examenTerminado = true;
        },
        calificarExamen(){
            for (let i = 0; i < examen.respuestas.length; i++) {
                if (this.respuestas[i] !== ''){
                    if (examen.respuestas[i] === this.respuestas[i]) {
                        this.aciertos ++;
                        for (let j = 0; j < examen.materias.length; j++) {
                            if (i >= examen.materias[j].inicio - 1 && 
                                i<=examen.materias[j].fin -1 ) {
                                this.aciertosPorMateria[j].aciertos ++;
                            }                            
                        }
                    }
                }
            }
            for (const aciertosM of this.aciertosPorMateria) {
                aciertosM. porcentaje = (aciertosM.aciertos/aciertosM.numReactivos)*100;
            }            
        }
    }

}
</script>

<style scoped>

multicol{
    -webkit-columns: 100px 4; /* Chrome, Safari, Opera */
    -moz-columns: 100px 4; /* Firefox */
    columns: 100px 4;
    -moz-column-fill: balance; /* Firefox */
    column-fill: balance;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
    .multicol{
        text-align: center;
        -webkit-columns: 100px 1; /* Chrome, Safari, Opera */
        -moz-columns: 100px 1; /* Firefox */
        columns: 100px 1;
        -moz-column-fill: balance; /* Firefox */
        column-fill: balance;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
    .multicol{
        -webkit-columns: 100px 2; /* Chrome, Safari, Opera */
        -moz-columns: 100px 2; /* Firefox */
        columns: 100px 2;
        -moz-column-fill: balance; /* Firefox */
        column-fill: balance;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
    .multicol{
        -webkit-columns: 100px 3; /* Chrome, Safari, Opera */
        -moz-columns: 100px 3; /* Firefox */
        columns: 100px 3;
        -moz-column-fill: balance; /* Firefox */
        column-fill: balance;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
    .multicol{
        -webkit-columns: 100px 4; /* Chrome, Safari, Opera */
        -moz-columns: 100px 4; /* Firefox */
        columns: 100px 4;
        -moz-column-fill: balance; /* Firefox */
        column-fill: balance;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
    .multicol{
        -webkit-columns: 100px 5; /* Chrome, Safari, Opera */
        -moz-columns: 100px 5; /* Firefox */
        columns: 100px 5;
        -moz-column-fill: balance; /* Firefox */
        column-fill: balance;
    }
}

</style>