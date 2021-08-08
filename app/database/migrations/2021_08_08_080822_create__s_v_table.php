<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSVTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SV', function (Blueprint $table) {
            $table->string('id', 255)->primary();
            $table->unsignedBigInteger('LopHoc_Id')->nullable();
            $table->timestamps();

            $table->foreign('LopHoc_Id')
            ->references('id')
            ->on('DM_LopHoc')
            ->onDelete('set null')
            ->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::table('SV', function (Blueprint $table) {
        //     $table->dropForeign(['LopHoc_Id']);
        // });
        Schema::dropIfExists('SV');
    }
}
