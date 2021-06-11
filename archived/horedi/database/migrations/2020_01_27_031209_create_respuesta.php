<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRespuesta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('respuesta', function (Blueprint $table) {
            $table->bigIncrements('respuesta_id');
            $table->integer('num_pregunta');
            $table->string('respuesta');
            $table->unsignedBigInteger('examen_id');
            $table->timestamps();

            $table->foreign('examen_id')
                ->references('examen_id')
                ->on('examen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('respuesta');
    }
}
