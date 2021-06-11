<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="form-group">
                    <!--label for="exampleInputEmail1">Email address</label-->
                    <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Buscar estudiante"
                        v-model="search">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Periodo</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="estudiante in estudiantesFiltered">
                        <td>{{estudiante.name}}</td>
                        <td>{{estudiante.grupos[0].curso.nombre}}</td>
                        <td>{{estudiante.grupos[0].curso.annio_inicio}} - {{estudiante.grupos[0].curso.annio_fin}} </td>
                        <td>{{estudiante.grupos[0].num_grupo}}</td>
                        <td>
                            <button class="btn btn-primary">Modificar estudiante</button>
                            <button class="btn btn-success">Ver calificaciones</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
              estudiantes : null,
              search : ''
          }
        },
        mounted() {
            let url = window.location.origin + '/admin/alumno';
            axios
                .get(url)
                .then(response => {
                    this.estudiantes = response.data;
                });
        },
        computed: {
            estudiantesFiltered(){
                if (this.estudiantes){
                    return this.estudiantes.filter( (estudiante) => {
                            return estudiante.name.toLowerCase().match(this.search.toLowerCase());
                        }
                    );
                }
                return null;
            }
        }
    }
</script>
