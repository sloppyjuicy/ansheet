<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-md-12 mb-2 text-center">
                <h2>Reporte COMIPEMS 2019-2020</h2>
                <!--ul>
                    <li v-for="resultado in resultados" :key="resultado.id">{{resultado}}</li>
                </ul>
                <button class="btn btn-primary" @click="cargarChart">Crear grafica</button>
                <canvas id="myChart" width="400" height="400"></canvas-->
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
              <b-card no-body>
                <b-tabs pills card vertical>
                    <b-tab title="Welcome">
                        Hello
                    </b-tab>
                    <b-tab :title="resultado.nombre_alumno" v-for="resultado in resultados" 
                        :key="resultado.id" @click="cargarChart(resultado.id)">
                        <!--b-card-text>{{resultado.id}}</b-card-text-->
                        <div class="row">
                            <div class="col-md-12">
                                <canvas :id="resultado.id"></canvas>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
            </b-card>
            </div>
        </div>
    </div>
</template>

<script>
import {db} from '../firebase'
import Chart from 'chart.js'
export default {
    data(){
        return {
            resultados :[],
            puntajes : [70, 81, 67, 102, 50, 38]
        }    
    },
    methods:{
        cargarChart(id){
            // Hacer consultas y finalmente gráficar!!
            /*let docRef = db.collection('resultados')
                .doc('1ZNL5V2WBqmes2UJmL1r')
                .collection('examenes')
                .doc('s4GV0UHZvlfp4iSXFnrK').get()
            docRef.then(doc => {
                console.log(doc.data());
            })*/
            let ctx = document.getElementById(id);
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'Exámenes',
                        data: this.puntajes,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            console.log(myChart);
        },
        debugin(){
            console.log("Funcionaaa");
            this.cargarChart()
            
        }
    },
    firestore:{
        resultados : db.collection('resultados'),
    },


}
</script>