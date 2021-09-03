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
            $table->id();
            $table->unsignedBigInteger('idDaoTao');
            $table->unsignedBigInteger('MauTieuChi_Id')->nullable();
            $table->string('TenHocKy');
            $table->string('NamBatDau');
            $table->string('NamKetThuc');
            $table->boolean('DaoTaoHienHanh')->default(0);
            $table->boolean('HienHanh')->default(0);
            $table->softDeletes();
            $table->timestamps();
            $table->timestamp('n_deleted_at')->virtualAs("COALESCE(deleted_at, '1980-01-01')");

            $table->unique(['idDaoTao', 'TenHocKy', 'n_deleted_at']);

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
        Schema::dropIfExists('DM_HocKy');
    }
}
