<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluacion', function (Blueprint $table) {
            $table->bigIncrements('evaluacion_id');
            $table->unsignedBigInteger('inscripcion_id');
            $table->unsignedBigInteger('examen_id');
            $table->integer('num_examen');
            $table->boolean('esta_activo')->default(false);
            $table->timestamps();

            $table->foreign('inscripcion_id')
                ->references('inscripcion_id')->on('inscripcion');
            $table->foreign('examen_id')
                ->references('examen_id')->on('examen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluacion');
    }
}
