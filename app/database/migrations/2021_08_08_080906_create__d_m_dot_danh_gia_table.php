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
            $table->id()->index();
            $table->unsignedBigInteger('HocKy_Id')->nullable();
            $table->unsignedBigInteger('MauTieuChi_Id')->nullable();
            $table->string('TenDotDanhGia');
            $table->string('TenKhongDau')->default('');
            $table->boolean('PhatHanh')->default(false);
            $table->softDeletes();
            $table->timestamps();
            $table->timestamp('n_deleted_at')->virtualAs("COALESCE(deleted_at, '1980-01-01')");

            $table->unique(['HocKy_Id', 'n_deleted_at']);

            $table->foreign('HocKy_Id')
            ->references('id')
            ->on('DM_HocKy')
            ->onDelete('set null')
            ->onUpdate('cascade');

            $table->foreign('MauTieuChi_Id')
            ->references('id')
            ->on('DM_MauTieuChi')
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
        // Schema::table('DM_DotDanhGia', function (Blueprint $table) {
        //     $table->dropForeign(['HocKy_Id']);
        //     $table->dropForeign(['MauTieuChi_Id']);
        // });
        Schema::dropIfExists('DM_DotDanhGia');
    }
}
