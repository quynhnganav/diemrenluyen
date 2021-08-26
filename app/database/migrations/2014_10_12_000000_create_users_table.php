<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id()->index();
            $table->unsignedBigInteger('HocKyHienTai_Id')->nullable();
            $table->unsignedBigInteger('Profile_id')->nullable();
            $table->string('Profile_type')->nullable();
            $table->string('Ten');
            $table->string('HoDem');
            $table->string('HoTenKhongDau')->index();
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->string('picture')->nullable();
            $table->string('SoDienThoai')->nullable();
            $table->string('SoDienThoaiGiaDinh')->nullable();
            $table->date('NgaySinh')->nullable();
            $table->integer('GioiTinh')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->rememberToken();
            $table->softDeletes($column = 'deleted_at', $precision = 0);
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
        Schema::dropIfExists('users');
    }
}
