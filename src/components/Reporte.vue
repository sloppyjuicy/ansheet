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
            <div class="col-3">
                <div class="list-group" id="list-tab" role="tablist">
                <a class="list-group-item list-group-item-action active" id="list-home-list" 
                    data-toggle="list" href="#list-home" role="tab" aria-controls="home">Rodrigo Francisco</a>
                <a class="list-group-item list-group-item-action" id="list-profile-list" 
                    data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Ulises Ortiz</a>
                <a class="list-group-item list-group-item-action" id="list-messages-list" 
                    data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Mike Francisco</a>
                <a class="list-group-item list-group-item-action" id="list-settings-list" 
                    data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Carlos Ramírez</a>
                </div>
            </div>
            <div class="col-9">
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">...</div>
                    <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">...</div>
                    <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">...</div>
                    <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">...</div>
                </div>
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
            puntajes : [],
            resultados :[],
        }    
    },
    mounted(){
        /*this.cargarChart()*/
    },
    methods:{
        cargarChart(){
            let ctx = document.getElementById('myChart');
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
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
        }
    },
    firestore:{
        puntajes : db.collection('puntajes'),
        resultados : db.collection('resultados'),
    },


}
</script>