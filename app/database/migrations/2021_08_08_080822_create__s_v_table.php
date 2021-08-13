<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSVTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SV', function (Blueprint $table) {
            $table->id()->index();
            $table->string("MaSV", 255)->unique();
            $table->string("TenNganh", 255);
            $table->string("TrangThai", 255)->nullable();
            $table->string("GhiChu", 255)->nullable();
            $table->integer('LopHoc_Id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('LopHoc_Id')
            ->references('id')
            ->on('DM_LopHoc')
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
        // Schema::table('SV', function (Blueprint $table) {
        //     $table->dropForeign(['LopHoc_Id']);
        // });
        Schema::dropIfExists('SV');
    }
}
