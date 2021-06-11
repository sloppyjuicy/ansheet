<?php

use App\Models\Curso;
use Illuminate\Database\Seeder;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Curso::create([
            'nombre' => 'Curso Universidad',
            'annio_inicio' => 2019,
            'nivel' => 'licenciatura',
            'annio_fin' => 2020
        ]);
        Curso::create([
            'nombre' => 'Curso Comipems',
            'annio_inicio' => 2019,
            'nivel' => 'bachillerato',
            'annio_fin' => 2020
        ]);
    }
}
