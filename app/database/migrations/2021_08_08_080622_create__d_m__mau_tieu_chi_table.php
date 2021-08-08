<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDMMauTieuChiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('DM_MauTieuChi', function (Blueprint $table) {
            $table->id();
            $table->string('TenMauTieuChi');
            $table->string('TenKhongDau')->default('');
            $table->integer('TongSoDiem')->default(0);
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
        Schema::dropIfExists('DM_MauTieuChi');
    }
}
