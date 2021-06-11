<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(CursoSeeder::class);
        $this->call(GrupoSeeder::class);
        $this->call(AlumnoSeeder::class);
        $this->call(InscripcionSeeder::class);

        $this->call(ExamenSeeder::class);
        $this->call(RespuestaSeeder::class);
        $this->call(DivisionSeeder::class);
        $this->call(EvaluacionSeeder::class);
    }
}
