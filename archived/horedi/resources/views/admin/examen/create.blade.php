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
            <form action="{{route('admin.examen.store')}}" method="post">
                @csrf
                <div class="form-group row">
                    <label for="inputInst" class="col-sm-2 col-form-label">Institución</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputInst" >
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Año</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputAnnio" >
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Área</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputAnnio">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Núm. preguntas</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputAnnio">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="inputAnnio" class="col-sm-2 col-form-label">Núm opciones</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputAnnio">
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-success">Siguiente</button>
                    </div>
                </div>
            </form>
        </div>
    </div>


@endsection
