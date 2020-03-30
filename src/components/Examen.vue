<template>
    <div class="container-xl py-4">
        <div class="row">
            <div class="col-md-12">
                <h4>Examen de simulación</h4>
                <h5>{{examen.institucion}} {{examen.area}} {{examen.annio}}</h5>
            </div>
        </div>
        <form class="pb-2" v-if="!examenTerminado">
            <div class="row">
                <div class="col-md-6 col-sm-12 mb-2">
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
            <!--div class="card-body"-->
                <div class="row">
                    <div class="col-md-6">
                        <h5>{{datosAlumno.nombre}} {{datosAlumno.apellidos}}</h5>
                    </div>
                    <div class="col-md-6 text-center">
                        <h5>Aciertos totales: {{aciertos}}</h5>
                    </div>
                </div>
                <div class="row" v-for="aciertosM in aciertosPorMateria" :key="aciertosM.nombre">
                    <div class="col-md-2">
                        <h6>{{aciertosM.nombre}}</h6>
                    </div>
                    <div class="col-md-8">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" 
                                :style="{width: aciertosM.porcentaje+'%'}"
                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                {{aciertosM.aciertos}} /
                                {{aciertosM.numReactivos}}
                            </div>
                        </div>
                    </div>
                </div>
            <!--/div-->
        </div>
        <div class="row mt-3">
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
                            <label v-if="examenTerminado && aciertoPorPregunta[i]">&#x2714;</label>
                            <label v-if="examenTerminado && !aciertoPorPregunta[i]">&#x2718;</label>
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
//import examen from "../canswers/unam2020area3.json";
export default {
    name:'Examen',
    props:[
        'examen'
    ],
    data(){
        return {
            //examen : examen1,
            examenTerminado : false,
            respuestas : null,
            datosAlumno :{
                nombre : '',
                apellidos : ''
            },
            aciertos : 0,
            aciertosPorMateria: [],
            aciertoPorPregunta :[],
        }
    },
    mounted(){
        this.respuestas =  new Array(this.examen.numReactivos).fill('')     
        /*const {inicio,fin, ...tmp} = examen.materias[1]; 
            Es una buena solución para copiar un objeto sin algunas propiedades
            pero Vue JS no lo permite porque inicio y fin no se vuelven a ocupar.
        */
       for (const materia of this.examen.materias) {
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
            if (this.datosAlumnoForm()) {
                if (this.todasLasPreguntasContestadas()) {
                    this.calificarExamen();
                    this.examenTerminado = true;
                }else{
                    this.$toast.warning('Contesta todas las preguntas', 'OJO',{
                        icon: "icon-person",
                        position: "topCenter",
                    });
                }
                
            }else{
                this.$toast.warning('Ingresa tu nombre y apellidos', 'OJO',
                    {
                        icon: "icon-person",
                        position: "topCenter",
                    }
                );
            }
            
        },
        calificarExamen(){
            for (let i = 0; i < this.examen.respuestas.length; i++) {
                if (this.respuestas[i] !== ''){
                    if (this.examen.respuestas[i] === this.respuestas[i]) {
                        this.aciertos ++;
                        this.aciertoPorPregunta.push(true);
                        for (let j = 0; j < this.examen.materias.length; j++) {
                            if (i >= this.examen.materias[j].inicio - 1 && 
                                i<=this.examen.materias[j].fin -1 ) {
                                this.aciertosPorMateria[j].aciertos ++;
                            }                            
                        }
                    }else{
                        this.aciertoPorPregunta.push(false);
                    }
                }
            }
            for (const aciertosM of this.aciertosPorMateria) {
                aciertosM. porcentaje = (aciertosM.aciertos/aciertosM.numReactivos)*100;
            }            
        },
        datosAlumnoForm(){
            if (this.datosAlumno.nombre.length < 3 && this.datosAlumno.apellidos < 5 ) {
                return false;
            }
            return true;
        },
        todasLasPreguntasContestadas(){
            console.log(this.dimensionRespuestas,this.examen.numReactivos);
            
            if (this.dimensionRespuestas === this.examen.numReactivos) {
                return true;
            }
            return false;
        }
    },
    computed:{
        dimensionRespuestas(){
            let dimension = this.respuestas.filter((respuesta)=>{
                return respuesta !== ""
            }).length

            return dimension;
        }
    }

}
</script>

<style scoped>
    @import url('../css/answersheet.css');
</style>