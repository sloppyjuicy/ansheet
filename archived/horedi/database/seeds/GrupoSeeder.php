<?php

use App\Models\Grupo;
use Illuminate\Database\Seeder;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Grupo::create([
           'num_grupo' => 1,
           'curso_id' => 1
        ]);
        Grupo::create([
            'num_grupo' => 2,
            'curso_id' => 1
        ]);
        Grupo::create([
            'num_grupo' => 1,
            'curso_id' => 2
        ]);
        Grupo::create([
            'num_grupo' => 2,
            'curso_id' => 2
        ]);
    }
}
