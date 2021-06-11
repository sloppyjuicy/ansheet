<?php

use App\Models\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'name' => 'admin',
            'lastname' => 'root',
            'email' => 'admin@example.com',
            'password' => Hash::make('rootadmin')
        ]);
    }
}
