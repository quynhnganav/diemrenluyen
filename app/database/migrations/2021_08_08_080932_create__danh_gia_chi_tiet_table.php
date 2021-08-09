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
            $table->unsignedBigInteger('DotDanhGia_Id')->nullable();
            $table->string('SinhVien_Id')->nullable();
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

            $table->foreign('DotDanhGia_Id')
            ->references('id')
            ->on('DM_DotDanhGia')
            ->onDelete('set null')
            ->onUpdate('cascade');

            $table->foreign('SinhVien_Id')
            ->references('id')
            ->on('SV')
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
        // Schema::table('DanhGiaChiTiet', function (Blueprint $table) {
        //     $table->dropForeign(['DotDanhGia_Id']);
        //     $table->dropForeign(['SinhVien_Id']);
        // });
        Schema::dropIfExists('DanhGiaChiTiet');
    }
}