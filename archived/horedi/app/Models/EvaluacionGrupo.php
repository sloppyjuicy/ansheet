<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluacionGrupo extends Model
{
    protected $table = 'evaluacion_grupo';
    protected $primaryKey = 'evaluacion_grupo_id';

    public function examen(){
        return $this->hasOne('App\Models\Examen','examen_id','examen_id');
    }
}
