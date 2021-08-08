<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDMDotDanhGiaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('DM_DotDanhGia', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('HocKy_Id');
            $table->unsignedBigInteger('MauTieuChi_Id');
            $table->string('TenDotDanhGia');
            $table->string('TenKhongDau')->default('');
            $table->boolean('PhatHanh')->default(false);
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
        Schema::dropIfExists('DM_DotDanhGia');
    }
}
