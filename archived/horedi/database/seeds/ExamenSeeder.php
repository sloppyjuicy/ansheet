<?php

use App\Models\Examen;
use Illuminate\Database\Seeder;

class ExamenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Examen::create([
            'nivel' => 'licenciatura',
            'annio' => 2019,
            'institucion' => 'UNAM',
            'area' => 'area 3',
            'num_preguntas' => 120,
            'num_opciones' => 4,
        ]);

        factory(Examen::class,9)->create();
    }
}
