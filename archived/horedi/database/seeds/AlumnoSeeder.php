<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AlumnoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Rodrigo Francisco',
            'email' => 'rodrigo@example.com',
            'password' => Hash::make('ludomatics')
        ]);
        User::create([
            'name' => 'Mike Francisco',
            'email' => 'mike@example.com',
            'password' => Hash::make('ludomatics')
        ]);

        factory(App\Models\User::class,18)->create();
    }
}
