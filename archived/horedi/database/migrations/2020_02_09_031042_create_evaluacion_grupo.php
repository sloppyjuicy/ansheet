<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluacionGrupo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluacion_grupo', function (Blueprint $table) {
            $table->bigIncrements('evaluacion_grupo_id');
            $table->integer('num_examen');
            $table->unsignedBigInteger('grupo_id');
            $table->unsignedBigInteger('examen_id');
            $table->timestamps();

            $table->foreign('grupo_id')
                ->references('grupo_id')
                ->on('grupo');
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
        Schema::dropIfExists('evaluacion_grupo');
    }
}
