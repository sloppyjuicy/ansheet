<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDivision extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('division', function (Blueprint $table) {
            $table->bigIncrements('division_id');
            $table->unsignedBigInteger('examen_id');
            $table->string('nombre_division');
            $table->integer('inicio');
            $table->integer('fin');
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
        Schema::dropIfExists('division');
    }
}
