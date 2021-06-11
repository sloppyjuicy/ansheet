<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluacion extends Model
{
    protected $table = 'evaluacion';
    protected $primaryKey = 'evaluacion_id';

    public function examen(){
        return $this->belongsTo('App\Models\Examen','examen_id','examen_id');
    }
}
