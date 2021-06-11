<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::prefix('admin')->name('admin.')->group(function() {
    Route::get('login','Auth\AdminLoginController@showLoginForm')->name('login');
    Route::post('login', 'Auth\AdminLoginController@login')->name('login.submit');
    Route::get('logout', 'Auth\AdminLoginController@logout')->name('logout');
    Route::get('/', 'AdminController@index')->name('dashboard');

    Route::get('evaluacion/create-ev/{grupo}','EvaluacionController@createEvaluacion')->name('evaluacion.create-ev');

    Route::resource('grupo', 'GrupoController');
    Route::resource('examen', 'ExamenAdminController');
    Route::resource('evaluacion', 'EvaluacionController');
    Route::resource('examen/respuesta', 'RespuestaExamenController');
    Route::resource('alumno','AlumnoAdminController');
    /*Route::get('/alumno/registrar', 'AdminEscuelaController@alumnoRegistrarMostrar')->name('admin.alumno.registrar');
    Route::post('/alumno/registrar', 'AdminEscuelaController@alumnoRegistrar')->name('admin.alumno.registrar.submit');

    Route::get('/grupo/registrar', 'AdminEscuelaController@grupoRegistrarMostrar')->name('admin.grupo.registrar');
    Route::post('/grupo/registrar', 'AdminEscuelaController@grupoRegistrar')->name('admin.grupo.registrar.submit');

    Route::get('/examen/registrar', 'AdminEscuelaController@examenRegistrarMostrar')->name('admin.examen.registrar');
    Route::post('/examen/registrar', 'AdminEscuelaController@examenRegistrar')->name('admin.examen.registrar.submit');*/
});

Route::get('/', function () {
    if(Auth::user() != null){
        return redirect(route('home'));
    }

    return view('welcome');
});
/*
 * Solo se puede acceder a las siguiente rutas si el usuario esta logeado.
 * */
Route::get('/home', 'HomeController@index')->name('home');
Route::prefix('examen')->group(function() {
    Route::post('/grade/{clave}', 'ExamenController@grade')->name('examen.grade');
    Route::get('/report/{clave}', 'ExamenController@report')->name('examen.report');
});

Route::resource('examen','ExamenController');


Route::prefix('test')->group(function (){
    Route::get('examen/{id}','TestController@testExamenGrade')->name('test.examen.grade');
});


