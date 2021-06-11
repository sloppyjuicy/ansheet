<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Models\Examen::class, function (Faker $faker) {
    $nivel = $faker->randomElement(['bachillerato','licenciatura']);
    $institucion = 'UNAM';
    $area = null;
    if ($nivel == 'bachillerato'){
        $faker->randomElement(['UNAM','CENEVAL']);
    }else{
        $institucion = $faker->randomElement(['UNAM','IPN','UAM']);
        $area = $faker->randomElement(['área 1','area 2','area 3','area 4']);
    }
    return [
        'nivel' => $nivel,
        'annio' => rand(2005,2020),
        'institucion' => $institucion,
        'area' => $area,
        'num_preguntas' => 120,
        'num_opciones' => 4
    ];
});
