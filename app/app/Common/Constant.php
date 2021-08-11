<?php

namespace App\Common;

class Constant {

    const PERMISSIONS = [
        'DANHGIA' => '',
        'CBL_DANHGIA' => '',
        'XEM_DANHGIA' => '',
        'XEM_ALL_DANHGIA' => '',
        'TONGHOP_DANHGIA' => '',
        'TONGHOP_DANHGIA_ALL' => '',
        'NHANXET_DANHGIA' => '',
        'NHANXET_DANHGIA_ALL' => ''
    ];

    public $API_DAOTAO_URI;
    public $API_DAOTAO_SECRET;

    public function __construct() {
        $this->API_DAOTAO_URI = env("API_DAOTAO_URI", "localhost");
        $this->API_DAOTAO_SECRET = env("API_DAOTAO_SECRET", "localhost");
   } 

}