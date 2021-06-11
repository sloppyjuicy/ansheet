<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'curso';
    protected $primaryKey = 'curso_id';

    public function grupos(){
        return $this->hasMany('App\Models\Grupo','curso_id','curso_id');
    }
}
