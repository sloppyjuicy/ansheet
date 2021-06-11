<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial', function (Blueprint $table) {
            $table->bigIncrements('historial_id');
            $table->unsignedBigInteger('inscripcion_id');
            $table->unsignedBigInteger('examen_id');
            $table->integer('puntaje_total');
            $table->timestamps();

            $table->foreign('inscripcion_id')
                ->references('inscripcion_id')
                ->on('inscripcion');
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
        Schema::dropIfExists('historial');
    }
}
