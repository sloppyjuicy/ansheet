<template>
    <div class="container-xl py-4">
        <div class="row pb-3">
            <div class="col-md-12">
                <h4>Examen de simulación</h4>
                <h5>UNAM 2012 aréa 2</h5>
            </div>
        </div>
        <form class="pb-4">
            <div class="row">
                <div class="col">
                <input type="text" class="form-control" placeholder="First name">
                </div>
                <div class="col">
                <input type="text" class="form-control" placeholder="Last name">
                </div>
            </div>
        </form>
        <div class="row">
            <div class="col-md-12 multicol">
                <ol>
                    <li v-for="i in numReactivos" :key="i">
                        <div v-for="n in numOpciones" :key="n" class="d-inline mr-1">
                            <label class="mr-1">{{String.fromCharCode(64+n)}}</label>
                            <input type="radio" :name="'test-'+i" >
                        </div>
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
        return {
            numReactivos,
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