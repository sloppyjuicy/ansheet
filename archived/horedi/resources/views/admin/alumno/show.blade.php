@extends('layouts.master')

@section('content')
    <div class="container py-4">
        <div class="row">
            <div class="col-md-8 mb-2">
                <h2>{{$alumno->name}}</h2>
                <!-- EN CASO DE QUE EL USUARIO SE HAYA INSCRITO EN VARIOS GRUPOS, SE MOSTRARÁ EL MÁS RECIENTE (last) -->
                <h3>Curso Universidad 2020</h3>
                <h4>Grupo 2</h4>
                <hr>
            </div>
            <div class="col-md-8 col-lg-8 mb-2 col-sm-12">
                @if(count($alumno->evaluaciones) > 0)
                    <h5>Exámenes disponibles</h5>
                @endif
                <ul class="list-group">
                    @foreach($alumno->evaluaciones as $evaluacion)
                        <li class="list-group-item"><a href="{{route('examen.show',['examan' => $evaluacion->examen_id])}}">
                                {{$evaluacion->examen->institucion}} {{$evaluacion->examen->annio}} {{$evaluacion->examen->area}}
                            </a></li>
                    @endforeach
                </ul>
            </div>
            <div class="col-md-8 col-lg-8 col-sm-12 mb-3">
                @if(count($alumno->historial) > 0)
                    <h5>Historial</h5>
                @endif

                <div class="accordion" id="accordionExample">
                    @foreach($alumno->historial as $h)
                        <div class="card">
                            <div class="card-header" id="heading{{$h->historial_id}}">
                                <h2 class="mb-0">
                                    <button class="btn btn-link {{!$loop->first? 'collapsed': ''}}" type="button"
                                            data-toggle="collapse" data-target="#collapse{{$h->historial_id}}"
                                            aria-expanded="true" aria-controls="collapse{{$h->historial_id}}">
                                        {{$h->examen->institucion}} {{$h->examen->annio}} {{$h->examen->area}}
                                    </button>
                                </h2>
                            </div>

                            <div id="collapse{{$h->historial_id}}" class="collapse {{$loop->first ? 'show': ''}}"
                                 aria-labelledby="heading{{$h->historial_id}}" data-parent="#accordionExample">
                                <div class="card-body">
                                    @foreach($h->puntajeAlu as $materia)
                                        <div class="row">
                                            <div class="col-md-2">
                                                <h6>{{$materia->materia}}</h6>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" style="width:{{$materia->calificacion*10}}%;"
                                                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        {{$materia->puntaje}} /
                                                        {{$materia->total}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                    <h5 class="mt-1">Puntaje total: {{$h->puntaje_total}}</h5>
                                    <a href="{{route('examen.report',['clave' => $h->examen_id])}}">Ver más</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <!-- /.row -->
    </div>
    </div>
@endsection
