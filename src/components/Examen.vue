<template>
    <div class="container-xl py-4">
        <div class="row">
            <div class="col-md-12 m-3">
                <h4>Examen de simulación</h4>
                <h5>UNAM 2012 aréa 2</h5>
            </div>
        </div>
        <form class="pb-3" v-if="!examenTerminado">
            <div class="row">
                <div class="col">
                <input type="text" class="form-control" placeholder="Nombre" v-model="datosAlumno.nombre" >
                </div>
                <div class="col">
                <input type="text" class="form-control" placeholder="Apellidos" v-model="datosAlumno.apellidos">
                </div>
            </div>
        </form>
        <div class="pb-3" v-else>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h5>{{datosAlumno.nombre}} {{datosAlumno.apellidos}}</h5>
                    </div>
                    <div class="col-md-6 text-center">
                        <h6>Aciertos totales: 36</h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <h6>Matemáticas</h6>
                    </div>
                    <div class="col-md-8">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width:90%;"
                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                10 /
                                12
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2">
                        <h6>Español</h6>
                    </div>
                    <div class="col-md-8">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width:90%;"
                                aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                9 /
                                12
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 multicol">
                <ol>
                    <li v-for="i in numReactivos" :key="i">
                        <div v-for="n in numOpciones" :key="n" class="d-inline mr-1">
                            <label class="mr-1">{{String.fromCharCode(64+n)}}</label>
                            <input type="radio" :name="'test-'+i" :disabled="examenTerminado">
                        </div>
                        <label v-if="examenTerminado">&#x2714;</label>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>        

<script>
export default {
    name:'Examen',
    data(){
        let numReactivos = 120;
        let datosAlumno = {
            nombre: 'Rodrigo',
            apellidos : 'Francisco'
        };
        return {
            numReactivos,
            datosAlumno,
            examenTerminado : false,
            numOpciones : 4,
            respuestas : new Array('').fill(numReactivos)
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