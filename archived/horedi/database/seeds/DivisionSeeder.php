<?php

use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i <= 10; $i++){
            Division::create([
                "nombre_division" => "Fisica",
                "inicio" => 1,
                "fin" => 12,
                "examen_id" => $i
            ]);
            Division::create([
                "nombre_division" => "Literatura",
                "inicio" => 13,
                "fin" => 22,
                "examen_id" => $i
            ]);
            Division::create([
                "nombre_division" => "Quimica",
                "inicio" => 23,
                "fin" => 35,
                "examen_id" => $i
            ]);

            Division::create([
                "nombre_division" => "Geografia",
                "inicio" => 36,
                "fin" => 45,
                "examen_id" => $i
            ]);

            Division::create([
                "nombre_division" => "Matematicas",
                "inicio" => 46,
                "fin" => 69,
                "examen_id" => $i
            ]);

            Division::create([
                "nombre_division" => "Espanol",
                "inicio" => 70,
                "fin" => 87,
                "examen_id" => $i
            ]);

            Division::create([
                "nombre_division" => "Biologia",
                "inicio" => 88,
                "fin" => 100,
                "examen_id" => $i
            ]);

            Division::create([
                "nombre_division" => "Historia U.",
                "inicio" => 101,
                "fin" => 110,
                "examen_id" => $i
            ]);

            Division::create([
                "nombre_division" => "Historia M.",
                "inicio" => 111,
                "fin" => 120,
                "examen_id" => $i
            ]);
        }
    }
}
