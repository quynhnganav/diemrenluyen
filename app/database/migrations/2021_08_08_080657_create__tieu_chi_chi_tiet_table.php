<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Kalnoy\Nestedset\NestedSet;

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
            $table->id()->index();
            $table->unsignedBigInteger('MauTieuChi_Id');
//            $table->unsignedBigInteger('TieuChiChiTiet_Id')->nullable();
            $table->longText('TenTieuChi');
            $table->longText('TenKhongDau')->nullable();
            $table->integer('SoDiem')->default(0);
            $table->boolean('isDiemHocTap')->default(0);
            $table->longText('Css')->nullable();

            //tree
            $table->nestedSet();

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('MauTieuChi_Id')
            ->references('id')
            ->on('DM_MauTieuChi')
            ->onDelete('cascade')
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
        Schema::table('TieuChiChiTiet', function (Blueprint $table) {
            $table->dropNestedSet();
        });
        Schema::dropIfExists('TieuChiChiTiet');
    }
}
