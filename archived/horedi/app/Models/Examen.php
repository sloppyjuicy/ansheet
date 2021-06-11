<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Examen extends Model
{
    protected $table='examen';
    protected $primaryKey='examen_id';

    public function respuestas(){
        return $this->hasMany('App\Models\Respuesta','examen_id');
    }
    public function divisiones(){
        return $this->hasMany('App\Models\Division','examen_id');
    }
}
