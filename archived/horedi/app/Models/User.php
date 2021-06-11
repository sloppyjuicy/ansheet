<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'alumno';
    protected $primaryKey = 'alumno_id';

    protected $with = ['grupos','grupos.curso'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /* Se representará como una relación M:N pero no lo es,
    * Esto debido a que se quieren conservar los datos del alumno complementante separados
    * De los datos del curso (grupo_id)
    * Cardinalidad 0,* */
    public function grupos(){
        return $this->belongsToMany('\App\Models\Grupo','inscripcion','alumno_id','grupo_id');
    }
    public function cursos(){
        return $this->belongsToMany('\App\Models\Curso','inscripcion','alumno_id','curso_id');
    }

    public function historial(){
        return $this->hasManyThrough('\App\Models\Historial',
            'App\Models\Inscripcion',
            'alumno_id',
            'inscripcion_id',
            'alumno_id',
            'inscripcion_id');
    }

    public function evaluaciones(){
        return $this->hasManyThrough('\App\Models\Evaluacion',
            'App\Models\Inscripcion',
            'alumno_id',
            'inscripcion_id',
            'alumno_id',
            'inscripcion_id');
    }

}
