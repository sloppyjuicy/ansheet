<?php

use App\Models\Evaluacion;
use Illuminate\Database\Seeder;

class EvaluacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Evaluacion::create([
            'inscripcion_id' => 1,
            'examen_id' => 1,
            'num_examen' => 1,
            'esta_activo' => true
        ]);
    }
}
