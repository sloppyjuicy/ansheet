( function ( $ ) {

    var charts = {
        init: function () {
            // -- Set new default font family and font color to mimic Bootstrap's default styling
            Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,' +
                '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
            Chart.defaults.global.defaultFontColor = '#292b2c';

            this.ajaxGetGrades();

        },

        ajaxGetGrades: function () {
            var urlPath =  'http://' + window.location.hostname + ':8000/examen/get_grades';
            var request = $.ajax( {
                method: 'GET',
                url: urlPath
            } );

            request.done( function ( responses ) {
                console.log(responses);
                charts.createCompletedJobsChart( responses);
            });
        },

        /**
         * Created the Completed Jobs Chart
         */
        createCompletedJobsChart: function ( responses) {
            for(response of responses){
                //var ctx = document.getElementById("resultado-"+response.nombre_modulo+''+response.examen_modulo_id);
                var ctx = document.getElementById("resultado-"+response.nombre_modulo+"-"+response.examen_modulo_id);
                var myLineChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                        label: "aciertos",
                        lineTension: 0.3,
                        backgroundColor: "rgba(255,0,0,0.8)",
                        borderColor: "rgba(255,0,0,0.8)",
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(255,0,0,0.8)",
                        pointBorderColor: "rgba(255,0,0,0.8)",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,0,0,0.8)",
                        pointHitRadius: 20,
                        pointBorderWidth: 2,
                        // The response got from the ajax request containing
                        // data for the completed jobs in the corresponding months
                        data: response.calificaciones
                    },{
                        label: "número de preguntas",
                        lineTension: 0.3,
                        backgroundColor: "rgba(161,255,53,0.5)",
                        borderColor: "rgba(161,255,53,0.5)",
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(161,255,53,0.5)",
                        pointBorderColor: "rgba(161,255,53,0.5)",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(161,255,53,0.5)",
                        pointHitRadius: 20,
                        pointBorderWidth: 2,
                        // The response got from the ajax request containing
                        // data for the completed jobs in the corresponding months
                        data: response.top_score
                    }],
                    // The response got from the ajax request containing all
                    // month names in the database
                    labels: response.materias,
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
            }
        }
    };

    charts.init();

} )( jQuery );
