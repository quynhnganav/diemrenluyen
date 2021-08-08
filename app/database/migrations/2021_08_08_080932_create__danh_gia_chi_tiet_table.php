<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDanhGiaChiTietTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('DanhGiaChiTiet', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('DotDanhGia_Id');
            $table->unsignedBigInteger('SinhVien_Id');
            $table->json('SinhVienDanhGia');
            $table->json('CanBoLopDanhGia');
            $table->unsignedBigInteger('TongSoDiem')->default(0);
            $table->boolean('SinhVienDuyet')->default(false);
            $table->boolean('CanBoLopDuyet')->default(false);
            $table->boolean('GiangVienDuyet')->default(false);
            $table->boolean('KhoaDuyet')->default(false);
            $table->string('GiangVienNhanXet')->default('');
            $table->string('CanBoLopNhanXet')->default('');
            $table->string('KhoaNhanXet')->default('');
            $table->string('YKienSinhVien')->default('');
            $table->string('GhiChu')->default(false);
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
        Schema::dropIfExists('DanhGiaChiTiet');
    }
}
