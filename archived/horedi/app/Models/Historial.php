<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Historial extends Model
{
    protected $table = 'historial';
    protected $primaryKey = 'historial_id';

    public function examen(){
        return $this->belongsTo('App\Models\Examen','examen_id','examen_id');
    }

    public function respuestasAlu(){
        return $this->hasMany('App\Models\RespuestaAlumno','historial_id','historial_id');
    }
    public function puntajeAlu(){
        return $this->hasMany('App\Models\PuntajeAlumno','historial_id','historial_id');
    }
}
