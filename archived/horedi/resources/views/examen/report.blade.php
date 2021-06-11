@extends('layouts.app')

@section('content')
    <!-- Page Content -->
    <div class="container py-4">
        @isset($examen)
            <div class="row">
                <div class="col-lg-12 col-sm-12 text-center">
                    <h2>Resultados Examen {{$examen->institucion}} {{$examen->annio}} {{$examen->area}} </h2>
                </div>
                <div class="col-lg-12 col-sm-12 mb-1">
                    <h4>{{ Auth::user()->name }}</h4>
                    <h5>Aciertos totales: {{$historial->puntaje_total}} </h5>
                </div>
                <div class="col-lg-12 col-sm-12">
                    <div class="row">
                        <div class="col-lg-10 col-sm-10 col-md-10 mr-md-n5">
                            <h5>Puntaje por materia</h5>
                            @foreach($historial->puntajeAlu as $materia)
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
                        </div>
                        <div class="col-lg-2 col-sm-2 col-md-2 text-center">
                            <h5>No olvides cerrar sesión</h5>
                            <a class="btn btn-primary" href="{{ route('logout') }}"
                               onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                {{ __('Cerrar sesión') }}
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12 col-sm-12 multicol mt-4 mb-4">
                    <ol>
                        @foreach($historial->respuestasAlu as $i => $respuesta)
                            @foreach($examen->divisiones as $div)
                                @if($i == $div->inicio - 1)
                                    <label for="materia">
                                        {{$div->nombre_division}}
                                        {{--Poner calificacion--}}
                                    </label>
                                @endif
                            @endforeach
                            <li>
                                @for($k = 0 ; $k < $examen->num_opciones; $k++)
                                    <label for="test-{{ $i }}">{{chr(65 + $k)}}</label>
                                    <input type="radio" name="{{ $i }}" value="{{chr(65 + $k)}}"
                                           disabled="true"
                                        {{ ($respuesta->res == chr(65 + $k)) ? 'checked' : '' }}/>
                                @endfor
                                @if($respuesta->es_correcto) &#10004 @else &#x2718   @endif
                            </li>
                        @endforeach
                    </ol>
                </div>
            </div>
        @else
            <h4>No se encontraron los datos de la hoja solicitada. Contacte al administrador.</h4>
    @endif
    <!--/div-->
        <div class="row mb-5" >
            <div class="col-12 text-center">
                <a class="btn btn-primary" href="{{route('home')}}" role="button">Regresar</a>
            </div>
        </div>
    </div>
    <!-- /.container -->
@endsection
