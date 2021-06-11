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
                    <li class="breadcrumb-item active" aria-current="page">Exámenes</li>
                </ol>
            </nav>
        </div>
    </div>
    <div class="row">
        <div class="col-md-6">
                <div class="form-group row">
                    <label for="inputInst" class="col-sm-2 col-form-label">Institución</label>
                    <div class="col-sm-10">
                        <input type="text" disabled class="form-control" id="inputInst" value="{{$examen->institucion}}">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Año</label>
                    <div class="col-sm-10">
                        <input type="text" disabled class="form-control" id="inputAnnio" value="{{$examen->annio}}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Área</label>
                    <div class="col-sm-10">
                        <input type="text" disabled class="form-control" id="inputAnnio" value="{{$examen->area}}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Núm. preguntas</label>
                    <div class="col-sm-10">
                        <input type="text" disabled class="form-control" id="inputAnnio" value="{{$examen->num_preguntas}}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Núm opciones</label>
                    <div class="col-sm-10">
                        <input type="text" disabled class="form-control" id="inputAnnio" value="{{$examen->num_opciones}}">
                    </div>
                </div>
        </div>
    </div>

    <div class="container-fluid">
        <form action="">
        <div class="col-lg-12 col-sm-12 multicol mt-4 mb-4">
            <ol>
                @foreach($examen->respuestas as $i => $respuesta)
                    <li>
                        @for($k = 0 ; $k < $examen->num_opciones; $k++)
                            <label for="test-{{ $i }}">{{chr(65 + $k)}}</label>
                            <input type="radio" name="{{ $i }}" value="{{chr(65 + $k)}}"
                                {{ ($respuesta->respuesta == chr(65 + $k)) ? 'checked' : '' }}/>
                        @endfor
                    </li>
                @endforeach
            </ol>
        </div>
        <div class="form-group row text-center">
            <div class="col-sm-12">
                <button type="submit" class="btn btn-success">Actualizar</button>
            </div>
        </div>
        </form>
    </div>

@endsection
