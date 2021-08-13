<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHocKyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('DM_HocKy', function (Blueprint $table) {
            $table->id()->index();
            $table->string('TenHocKy');
            $table->string('NamBatDau');
            $table->string('NamKetThuc');
            $table->boolean('HienHanh');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('DM_HocKy');
    }
}
