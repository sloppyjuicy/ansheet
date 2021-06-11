<?php

use App\Models\Inscripcion;
use Illuminate\Database\Seeder;

class InscripcionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1 ; $i <= 20; $i++){
            $cursoRand = rand(1,2);
            $gpo = $cursoRand == 1 ? rand(1,2) : rand(3,4);

            Inscripcion::create([
                'alumno_id' => $i,
                'curso_id' => $cursoRand,
                'grupo_id' => $gpo
            ]);
        }

    }
}
