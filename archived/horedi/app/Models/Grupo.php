<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $table = 'grupo';
    protected $primaryKey = 'grupo_id';

    public function alumnos(){
        return $this->belongsToMany('\App\Models\User','inscripcion','grupo_id','alumno_id');
    }

    public function evaluaciones(){
        return $this->hasMany('App\Models\EvaluacionGrupo','grupo_id','grupo_id');
    }

    public function curso(){
        return $this->belongsTo('App\Models\Curso','curso_id','curso_id');
    }

}
