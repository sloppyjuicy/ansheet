<template>
    <div class="container-fluid mt-4">
        <div class="row">
            <div class="col-md-12 mb-2 text-center">
                <h2>Reporte COMIPEMS 2019-2020</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
              <b-card no-body>
                <b-tabs pills card vertical>
                    <b-tab title="Welcome">This solves a bug :v</b-tab>
                    <b-tab :title="resultado.nombre_alumno" v-for="resultado in resultados" 
                        :key="resultado.id" @click="verInfo(resultado.id)">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <h3>Puntajes generales</h3>
                            </div>
                            <div class="col-md-12">
                                <canvas :id="resultado.id"></canvas>
                            </div>
                            <div class="col-md-12 text-center">
                                <h3>Puntajes por materia</h3>
                            </div>
                            <div class="col-md-12">
                                <canvas :id="`${resultado.id}-por-materia`"></canvas>
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
            materias_comipems : []
            ,examenes_name : []
        }    
    },
    firestore:{
        resultados : db.collection('resultados'),
        materias_comipems : db.collection('materias_comipems').orderBy('nombre_materia')
    },

    methods:{
        verInfo(id){
            // Hacer consultas y finalmente gráficar!!
            let etiquetas = []
            let puntajes = []
            let totales = []

            db.collection('resultados')
                .doc(id)
                .collection('examenes')
                .orderBy('fecha_aplicacion')
                .get()
                .then( querySnapshot =>  {
                    querySnapshot.forEach( doc => {
                        // doc.data() is never undefined for query doc snapshots
                        //console.log(doc.id, " => ", doc.data());
                        etiquetas.push({
                            nombre_examen : doc.get('nombre_examen'),
                            fecha_aplicacion: doc.get('fecha_aplicacion'),
                        });
                        puntajes.push(doc.get('puntaje'));
                        totales.push(doc.get('total'));
                    });
                    this.procesarDatos(id,etiquetas,puntajes,totales);
                });

            db.collection('resultados')
                .doc(id)
                .collection('examenes')
                .orderBy('fecha_aplicacion')
                .get()
                .then(querySnapshot =>  {
                    let puntajeMateriaPromesas = []
                    for (const doc of querySnapshot.docs) {
                        puntajeMateriaPromesas.push(
                            doc
                            .ref.collection('puntaje_por_materia')
                            .get()
                        );
                    }
                    this.procesarPromesas(id,puntajeMateriaPromesas);
                });
        },
        procesarPromesas(id,promesas){
            let puntajeExamenes = []
            for (const promesa of promesas) {
                promesa.then(querySnapshot => {
                    let puntajeMateria = []
                    querySnapshot.forEach( doc => {
                        puntajeMateria.push(doc.data())
                    });
                    puntajeExamenes.push(puntajeMateria)
                });
            }
            
            let nombre_examenes = []
            let examenesRef = db.collection('resultados')
                .doc(id)
                .collection('examenes')
                .orderBy('fecha_aplicacion')
                .get()
            examenesRef.then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    nombre_examenes.push(doc.get('nombre_examen'));
                });
            })

            Promise.allSettled([...promesas,examenesRef])
                .then((results) => {
                    results
                    this.procesarPuntajes(id,puntajeExamenes,nombre_examenes);
                });
            
        },
        procesarPuntajes(id,puntajes,nombre_examenes){
            let materias_comipems_nombre = []
            for (const m of this.materias_comipems) {
                materias_comipems_nombre.push(m.nombre_materia)
            }

            // Ordenando puntajes x orden alf. (tomando nombre_materia)
            for (const puntaje of puntajes) {
                puntaje.sort((a,b)=>{
                    return a.materia.toLowerCase()
                        .localeCompare(b.materia.toLowerCase())
                })
            }
            
            let materias = []
            for (const puntaje of puntajes) {
                let puntajes_i = []
                for (const mc_nombre of materias_comipems_nombre) {
                    if (this.objectContainsSubjectInArray(puntaje,mc_nombre)) {
                        puntajes_i.push(this.getScoreFromSubjectInArray(puntaje,mc_nombre))
                    }else{
                        puntajes_i.push(0)
                    }
                }
                materias.push(puntajes_i)         
            }
            console.log(materias);
            this.cargarChartPorMateria(id,materias_comipems_nombre,materias,nombre_examenes)

        },
        objectContainsSubjectInArray(obj,subject){
            for (const sub of obj) {
                if (sub.materia === subject) {
                    return true
                }
            }
            return false
        },
        getScoreFromSubjectInArray(obj,subject){
            for (const sub of obj) {
                if (sub.materia === subject) {
                    return sub.puntaje
                }
            }
        },
        procesarDatos(id,etiquetas,puntajes,totales){
            let etiquetasConFecha = []
            let etiquetasOrdenadas = etiquetas.sort( (a,b) => {
                return a.fecha_aplicacion - b.fecha_aplicacion
            });
            for (const etiqueta of etiquetasOrdenadas) {
                etiquetasConFecha.push(
                    etiqueta.nombre_examen+" \n("+
                    etiqueta.fecha_aplicacion.toDate().getDate()+"/"+
                    etiqueta.fecha_aplicacion.toDate().getMonth()+"/"+
                    etiqueta.fecha_aplicacion.toDate().getFullYear() +")"
                )
            }

            let maxTotal = Math.max(...totales)
            
            this.cargarChart(id,etiquetasConFecha,puntajes,maxTotal);
        },
        cargarChart(id,etiquetas,puntajes,maxTotal){
            
            let ctx = document.getElementById(id);
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: etiquetas,
                    datasets: [{
                        label: 'Exámenes simulación',
                        data: puntajes,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: maxTotal
                            }
                        }]
                    }
                }
            });
            myChart;
        },
        cargarChartPorMateria(id,etiquetas,puntajes,nombre_examenes){
            let dataset = []
            for (let i= 0;i<puntajes.length;i++) {
                let d = {
                    data : puntajes[i],
                    label : nombre_examenes[i],
                    borderWidth : 1
                }
                dataset.push(d)
            }
            
            let ctx = document.getElementById(`${id}-por-materia`);
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: etiquetas,
                    datasets: dataset
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: 16
                            }
                        }]
                    }
                }
            });
            myChart;
        }
    },
}
</script>