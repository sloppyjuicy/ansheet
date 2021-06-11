<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamenGradeRequest;
use App\Models\Evaluacion;
use App\Models\Examen;
use App\Models\Historial;
use App\Models\Inscripcion;
use App\Models\PuntajeAlumno;
use App\Models\RespuestaAlumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ExamenController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('all');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $examen = Examen::findOrFail($id);
        return view('examen.show')
            ->with('examen',$examen);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function grade(ExamenGradeRequest $request,$id){

        //TODO:- Validar que no hay un registro previo,
        // en caso de que ya, simplemente redirigir

        $examen = Examen::findOrFail($id);
        $res_correctas = $examen->respuestas;
        $examen_division = $examen->divisiones;
        // El request contiene el token de seguridad, hay que removerlo.
        $res_alumno = array_slice($request->input(), 1);
        // Comienza la lógica de calificar
        $contador_total = 0;
        $tick_or_cross = []; // intentar quitar
        $contador_parcial = array_fill(0, count($examen_division), 0);


        foreach ($res_correctas as $i => $respuesta){
            if ($respuesta->respuesta == $res_alumno[$i]){
                $contador_total++;
                array_push($tick_or_cross,true);
                foreach ($examen_division as $j => $div){
                    if ($i >= $div->inicio - 1 && $i<=$div->fin - 1 ){
                        $contador_parcial[$j]++;
                    }
                }
            }else{
                array_push($tick_or_cross,false);
            }
        }

        // Guardar historial
        $historial = new Historial();
        $inscripcion = Inscripcion::where('alumno_id',Auth::user()->alumno_id)->get()->last();
        $historial->inscripcion_id = $inscripcion->inscripcion_id;
        $historial->examen_id = $id;
        $historial->puntaje_total = $contador_total;
        $historial->save();

        foreach ($res_alumno as $i => $res){
            $tmp_resAlu = new RespuestaAlumno();
            $tmp_resAlu->res = $res;
            $tmp_resAlu->es_correcto = $tick_or_cross[$i];
            $tmp_resAlu->historial_id = $historial->historial_id;
            $tmp_resAlu->save();
        }

        foreach ($examen_division as $i => $div){
            $calificacion = round(
                ($contador_parcial[$i]/($div->fin - $div->inicio +1))*10,2);
            $tmp_puntajeAlu = new PuntajeAlumno();
            $tmp_puntajeAlu->materia = $div->nombre_division;
            $tmp_puntajeAlu->puntaje = $contador_parcial[$i];
            $tmp_puntajeAlu->calificacion = $calificacion;
            $tmp_puntajeAlu->total = $div->fin - $div->inicio +1 ;
            $tmp_puntajeAlu->historial_id = $historial->historial_id;
            $tmp_puntajeAlu->save();

        }

        $evaluacion = Evaluacion::where('examen_id',$id)
            ->where('inscripcion_id',$inscripcion->inscripcion_id)
            ->get()
            ->first();
        $evaluacion->esta_activo = false;
        $evaluacion->save();

        return redirect()->route('examen.report',["clave" => $examen->examen_id]);
    }

    public function report($id){

        $inscripcion = Inscripcion::where('alumno_id',1)->get()->last();

        // TODO:- Validar que esta consulta siempre traiga un dato.
        $historial =  Historial::where('examen_id',$id)
            ->where('inscripcion_id',$inscripcion->inscripcion_id)->get();
        $examen = Examen::findOrFail($id);
        return view('examen.report')
            ->with('examen',$examen)
            ->with('historial',$historial[0]);
    }
}
