@extends('layouts.master')
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

        <div class="col-sm-12">
            <h3>Exámenes nivel bachillerato</h3>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Institución</th>
                    <th scope="col">Año</th>
                    <th scope="col">Área</th>
                    <th scope="col">Núm. preguntas</th>
                    <th scope="col">Núm. opciones</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                @foreach($examenes as $examen)
                <tr>
                    <th scope="row">{{$loop->iteration}}</th>
                    <td>{{$examen->institucion}}</td>
                    <td>{{$examen->annio}}</td>
                    <td>{{$examen->area}}</td>
                    <td>{{$examen->num_preguntas}}</td>
                    <td>{{$examen->num_opciones}}</td>
                    <td>
                        {{--<a href="#" class="btn btn-danger">Eliminar</a>--}}
                        <a href="{{route('admin.respuesta.show',[$examen->examen_id])}}" class="btn btn-warning">Ver respuestas</a>
                        <a href="{{route('admin.examen.edit',[$examen->examen_id])}}" class="btn btn-success">Editar</a>
                        <a href="{{route('admin.respuesta.edit',[$examen->examen_id])}}" class="btn btn-primary">Editar respuestas</a>
                    </td>
                </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>

@endsection
