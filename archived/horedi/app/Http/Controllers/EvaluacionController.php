<?php

namespace App\Http\Controllers;

use App\Models\EvaluacionGrupo;
use App\Models\Examen;
use App\Models\Grupo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EvaluacionController extends Controller
{
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

    public function createEvaluacion($grupo_id){
        $grupo = Grupo::findOrFail($grupo_id);
        $examenes_bach = Examen::where('nivel','bachillerato')->get();
        $examenes_univ = Examen::where('nivel','licenciatura')->get();
        return view('admin.evaluacion.create')
            ->with('grupo',$grupo)
            ->with('examenes_bach',$examenes_bach)
            ->with('examenes_univ',$examenes_univ);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->input();
        $grupo_id = $data['grupo_id'];
        $examen_id = $data['examen_id'];
        $num_examen = DB::table('evaluacion_grupo')
            ->where('grupo_id',$grupo_id)
            ->max('num_examen');

        if (!$num_examen ) {
            $num_examen = 1;
        }else {
            $num_examen++;
        }

        if ($examen_id == 0){
            return redirect()->back();
        }

        $evaluacion_gpo = new EvaluacionGrupo();
        $evaluacion_gpo->num_examen = $num_examen;
        $evaluacion_gpo->grupo_id = $grupo_id;
        $evaluacion_gpo->examen_id = $examen_id;
        $evaluacion_gpo->save();

        return redirect()->route('admin.dashboard');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($grupo_id)
    {
        $grupo = Grupo::findOrFail($grupo_id);
        return view('admin.evaluacion.index')
            ->with('grupo',$grupo);
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
}
