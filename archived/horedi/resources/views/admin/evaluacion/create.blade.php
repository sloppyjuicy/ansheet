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
                    <li class="breadcrumb-item active" aria-current="page">Evaluación Grupo</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
            <form action="{{route('admin.evaluacion.store')}}" method="post">
            @csrf
            <div class="form-group row">
                <label for="inputInst" class="col-sm-2 col-form-label">Curso</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" disabled name="curso" value="{{$grupo->curso->nombre}}">
                    <input type="hidden" class="form-control" readonly name="curso_id" value="{{$grupo->curso->curso_id}}">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputAnnio" class="col-sm-2 col-form-label">Grupo</label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" name="grupo" value="{{$grupo->num_grupo}}">
                    <input type="hidden" class="form-control" readonly name="grupo_id" value="{{$grupo->grupo_id}}">
                </div>
            </div>
            @foreach($grupo->evaluaciones as $evaluacion)
            <div class="form-group row">
                <label for="inputAnnio" class="col-sm-2 col-form-label">
                    {{$loop->first ? 'Evaluación Diagnóstico': 'Simulación '.$loop->index}}
                </label>
                <div class="col-sm-10">
                    <input type="text" disabled class="form-control" id="inputAnnio" value=" UNAM 2019 area 2">
                </div>
            </div>
            @endforeach

            <div class="form-group row">
                <label for="inputAnnio" class="col-sm-2 col-form-label">Nueva evaluación</label>
                <div class="col-sm-10">
                    <select class="custom-select" name="examen_id">
                        <option  value="0" selected>Elige un examen</option>
                        @if($grupo->curso->nivel == 'licenciatura')
                            @foreach($examenes_univ as $examen)
                            <option value="{{$examen->examen_id}}">{{$examen->institucion}} {{$examen->annio}} {{$examen->area}}</option>
                            @endforeach
                        @elseif($grupo->curso->nivel == 'bachillerato')
                            @foreach($examenes_bach as $examen)
                                <option value="{{$examen->examen_id}}">{{$examen->institucion}} {{$examen->annio}} {{$examen->area}}</option>
                            @endforeach
                        @endif
                    </select>
                </div>
            </div>
            <button class="btn btn-success">Guardar</button>
            </form>
        </div>
    </div>

@endsection
