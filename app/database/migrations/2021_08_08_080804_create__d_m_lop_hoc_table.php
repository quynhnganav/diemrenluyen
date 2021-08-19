<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDMLopHocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('DM_LopHoc', function (Blueprint $table) {
            $table->integer('id')->primary()->index();
            $table->unsignedBigInteger('Khoa_Id')->nullable();
            $table->unsignedBigInteger('GV_Id')->nullable();
            $table->string('TenLopHoc');
            $table->string('TenKhongDau')->default('');
            $table->boolean('isSync')->default(0);
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('Khoa_Id')
            ->references('id')
            ->on('DM_Khoa')
            ->onDelete('set null')
            ->onUpdate('cascade');

            $table->foreign('GV_Id')
            ->references('id')
            ->on('GV')
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
        // Schema::table('DM_LopHoc', function (Blueprint $table) {
        //     $table->dropForeign(['Khoa_Id']);
        // });
        Schema::dropIfExists('DM_LopHoc');
    }
}
