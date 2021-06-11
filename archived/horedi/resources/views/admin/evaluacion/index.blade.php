@extends('layouts.master')
@section('styles')
    <link rel="stylesheet" href="{{asset('css/hojarespuestas.css')}}">
@endsection
@section('content')
    <div class="row pt-3 pb-2 mb-3 border-bottom">
        <div class="col-md-12">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Resultados de todas las evaluaciones</li>
                </ol>
            </nav>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-12">
            <h2>{{$grupo->curso->nombre}} Grupo {{$grupo->num_grupo}}</h2>
        </div>
    </div>

    <div class="row">
        <div class="col-md-3">
            <div class="list-group" id="list-tab" role="tablist">
                @foreach($grupo->alumnos as $alumno)
                <a class="list-group-item list-group-item-action {{$loop->first ? 'active':''}}" id="list-{{$loop->iteration}}-list"
                   data-toggle="list" href="#list-{{$loop->iteration}}" role="tab" aria-controls="{{$loop->iteration}}">{{$alumno->name}}</a>
                @endforeach
            </div>
        </div>
        <div class="col-md-9">
            <div class="tab-content" id="nav-tabContent">
                @foreach($grupo->alumnos as $alumno)
                <div class="tab-pane fade show {{$loop->first ? 'active':''}}" id="list-{{$loop->iteration}}"
                     role="tabpanel" aria-labelledby="list-{{$loop->iteration}}-list">
                    <h3>{{$alumno->name}}</h3>
                    <div class="row">
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
                </div>
                @endforeach
            </div>
        </div>
    </div>

@endsection
