<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTieuChiChiTietTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TieuChiChiTiet', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('MauTieuChi_Id');
            $table->unsignedBigInteger('TieuChiChiTiet_Id')->nullable();
            $table->string('TenTieuChi');
            $table->string('TenKhongDau')->default('');
            $table->integer('SoDiem')->default(0);
            $table->longText('Css')->nullable();
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
        Schema::dropIfExists('TieuChiChiTiet');
    }
}
