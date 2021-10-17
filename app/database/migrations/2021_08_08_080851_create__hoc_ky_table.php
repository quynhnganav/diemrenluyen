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
        Schema::create('table_DRL_DM_DotDanhGia', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('HocKy_Id');
            $table->unsignedBigInteger('MauTieuChi_Id')->nullable()->default(null);
            $table->boolean('HienHanh')->default(FALSE);
            $table->boolean('Khoa')->default(FALSE);
            $table->softDeletes();
            $table->timestamps();
            $table->timestamp('n_deleted_at')->virtualAs("COALESCE(deleted_at, '1980-01-01')");

            $table->unique(['HocKy_Id', 'n_deleted_at']);

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
        Schema::dropIfExists('DM_DotDanhGia');
    }
}
