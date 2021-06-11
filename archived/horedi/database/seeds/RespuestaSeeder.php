<?php

use App\Models\Respuesta;
use Illuminate\Database\Seeder;

class RespuestaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $opciones = ['A','B','C','D'];
        for ($j = 1 ; $j <= 10; $j++){
            for ($i = 1; $i<= 120; $i++){
                $opcionIndex = array_rand($opciones);
                $opcion = $opciones[$opcionIndex];
                Respuesta::create([
                    "respuesta" => $opcion,
                    "examen_id" => $j,
                    "num_pregunta" => $i
                ]);
            }
        }

    }
}
