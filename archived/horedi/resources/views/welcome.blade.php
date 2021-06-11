@extends('layouts.app')
@section('content')
    <!-- Masthead -->
    <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-10 align-self-end">
                    <h1 class="text-uppercase text-white font-weight-bold">HOREDI</h1>
                    <hr class="divider my-4">
                </div>
                <div class="col-lg-8 align-self-baseline">
                    <p class="text-white-75 font-weight-light mb-5">
                        Sistema de hoja de respuestas digitales
                    </p>
                    <a class="btn btn-primary btn-xl js-scroll-trigger mr-5" href="{{route('login')}}">Ingresar</a>
                    <!--a class="btn btn-primary btn-xl js-scroll-trigger" href="{{route('register')}}">Registrarse</a-->
                </div>
            </div>
        </div>
    </header>
@endsection
