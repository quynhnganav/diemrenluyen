<?php

namespace App\Common;

class Constant {
    public $API_DAOTAO_URI;
    public $API_DAOTAO_SECRET;

    public function __construct() {
        $this->API_DAOTAO_URI = env("API_DAOTAO_URI", "localhost");
        $this->API_DAOTAO_SECRET = env("API_DAOTAO_SECRET", "localhost");
   } 

}