<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use App\Models\Examen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:admin');
    }
    /**
     * show dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $annio_fin_max = DB::table('curso')->max('annio_fin');
        $cursos = Curso::where('annio_fin',$annio_fin_max)->get();
        return view('admin.dashboard')
            ->with('cursos',$cursos);
    }
}
