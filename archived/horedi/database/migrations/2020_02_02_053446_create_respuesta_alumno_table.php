<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuestaAlumnoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuesta_alumno', function (Blueprint $table) {
            $table->bigIncrements('respuesta_alumno_id');
            $table->string("res");
            $table->boolean("es_correcto");
            $table->unsignedBigInteger("historial_id");
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
        Schema::dropIfExists('respuesta_alumno');
    }
}
