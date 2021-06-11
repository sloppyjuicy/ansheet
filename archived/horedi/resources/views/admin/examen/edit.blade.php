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
            <form action="{{route('admin.examen.store',[$examen->examen_id])}}" method="post">
                @csrf
                <div class="form-group row">
                    <label for="inputInst" class="col-sm-2 col-form-label">Institución</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="institucion" id="inputInst" value="{{$examen->institucion}}">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Año</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="annio" id="inputAnnio" value="{{$examen->annio}}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Área</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="area" id="inputArea" value="{{$examen->area}}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Núm. preguntas</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="num_preg" id="inputNumPreg" value="{{$examen->num_preguntas}}">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Núm opciones</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="num_op" id="inputNumOp" value="{{$examen->num_opciones}}">
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-success">Actualizar</button>
                        <a href="{{url()->previous()}}" class="btn btn-primary ml-1">Regresar</a>
                    </div>
                </div>
            </form>
        </div>
    </div>

@endsection
