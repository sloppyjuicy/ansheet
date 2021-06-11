<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePuntajeAlumnoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('puntaje_alumno', function (Blueprint $table) {
            $table->bigIncrements('puntaje_alumno_id');
            $table->string('materia');
            $table->integer('puntaje');
            $table->integer('total');
            $table->decimal('calificacion');
            $table->unsignedBigInteger('historial_id');
            $table->timestamps();

            $table->foreign("historial_id")
                ->references("historial_id")
                ->on("historial");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('puntaje_alumno');
    }
}
