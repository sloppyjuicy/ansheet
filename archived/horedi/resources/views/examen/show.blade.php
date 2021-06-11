@extends('layouts.app')

@section('content')
    <!-- Page Content -->
    <div class="container py-4 mb-4">
        @isset($examen)
            <form action={{route('examen.grade',['clave'=>$examen->examen_id])}} method="post">
                {{ csrf_field() }}
                <div class="row">
                    <div class="col-12 text-center">
                        <h2>Hoja de respuestas digital</h2>
                        <h3>{{$examen->institucion}} {{$examen->annio}} {{$examen->area}} </h3>
                    </div>
                </div>
                <div class="multicol mt-4 mb-4">
                    <ol>
                        @for($i = 0; $i < $examen->num_preguntas; $i++)
                            @foreach($examen->divisiones as $div)
                                @if($i == $div->inicio - 1)
                                    <label for="materia">{{$div->nombre_division}}</label>
                                @endif
                            @endforeach
                            <li>
                                @for($k = 0 ; $k < $examen->num_opciones; $k++)
                                    <label for="test-{{ $i }}">{{chr(65 + $k)}}</label>
                                    <input type="radio" name="{{ $i }}" value="{{chr(65 + $k)}}"
                                        {{ (old($i) == chr(65 + $k)) ? 'checked' : '' }}/>
                                @endfor
                            </li>
                        @endfor
                    </ol>
                </div>
                <div class="row" >
                    <div class="col-12 text-center">
                        <button type="submit" class="btn btn-primary"> Enviar </button>
                    </div>
                </div>
            </form>
        @else
            <h4>No se encontraron los datos de la hoja solicitada. Contacte al administrador.</h4>
    @endif
    <!--/div-->
    </div>
    <!-- /.container -->
@endsection
