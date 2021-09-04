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
            $table->id()->index();
            $table->unsignedBigInteger('HocKy_Id')->nullable()->index();
            $table->string('MaSV')->nullable()->index();
            $table->json('SinhVienDanhGia')->nullable();
            $table->json('CanBoLopDanhGia')->nullable();
            $table->unsignedBigInteger('TongSoDiem')->nullable()->default(null);
            $table->unsignedBigInteger('TongSoDiemSinhVien')->nullable()->default(null);
            $table->boolean('SinhVienDuyet')->default(false);
            $table->boolean('CanBoLopDuyet')->default(false);
            $table->boolean('GiangVienDuyet')->default(false);
            $table->boolean('KhoaDuyet')->default(false);
            $table->string('GiangVienNhanXet')->default('');
            $table->string('CanBoLopNhanXet')->default('');
            $table->string('KhoaNhanXet')->default('');
            $table->string('YKienSinhVien')->default('');
            $table->string('GhiChu')->nullable()->default(null);
            $table->softDeletes();
            $table->timestamps();
            $table->timestamp('n_deleted_at')->virtualAs("COALESCE(deleted_at, '1980-01-01')");

            $table->unique(['HocKy_Id', 'MaSV', 'n_deleted_at']);



            $table->foreign('MaSV')
            ->references('MaSV')
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
        Schema::dropIfExists('DanhGiaChiTiet');
    }
}
