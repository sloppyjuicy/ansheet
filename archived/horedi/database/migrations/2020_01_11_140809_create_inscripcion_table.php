<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInscripcionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inscripcion', function (Blueprint $table) {
            $table->bigIncrements('inscripcion_id');
            $table->unsignedBigInteger('alumno_id');
            $table->unsignedBigInteger('curso_id');
            $table->string('sucursal')->nullable();
            $table->unsignedBigInteger('grupo_id')->nullable();
            $table->timestamps();

            $table->foreign('curso_id')->references('curso_id')->on('curso');
            $table->foreign('alumno_id')->references('alumno_id')->on('alumno');
            $table->foreign('grupo_id')->references('grupo_id')->on('grupo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('inscripcion');
    }
}
