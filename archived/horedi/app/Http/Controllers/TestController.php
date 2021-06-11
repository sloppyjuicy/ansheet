<?php

namespace App\Http\Controllers;

use App\Models\Examen;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function testExamenGrade($id)
    {
        $examen = Examen::findOrFail($id);

        $respuestas = [];
        for ($i = 0; $i < $examen->num_preguntas; $i++) {
            array_push($respuestas, chr(65 + rand(0, $examen->num_opciones - 1)));
        }

        return view('test.examen.grade')
            ->with('examen', $examen)
            ->with('respuestas', $respuestas);
    }
}
