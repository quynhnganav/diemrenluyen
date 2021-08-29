<?php

namespace App\Services;

use GuzzleHttp\Client;

class DTAPIService {

    private $API_DAOTAO_URI;
    private $API_DAOTAO_SECRET;
    private $client;

    public function __construct() {
        $this->API_DAOTAO_URI = env("API_DAOTAO_URI", "localhost");
        $this->API_DAOTAO_SECRET = env("API_DAOTAO_SECRET", "localhost");
        $this->client = new Client([
            // Base URI is used with relative requests
            'base_uri' => 'http://daotao.vku.udn.vn/api/',
            // You can set any number of default request options.
            // 'timeout'  => 2.0,
        ]);
    }

    public function getDanhSachHocKy()
    {
        $response = $this->client->request('GET', 'get_namhochocky');
        return json_decode($response->getBody()->getContents(), true);
    }

    public function getDanhSachLop()
    {
        $response = $this->client->request('GET', 'gvcn_list');
        return json_decode($response->getBody()->getContents(), true);
    }

    public function getDanhSachSVLop($id)
    {
        $response = $this->client->request('GET', 'gvcn_list/'.$id);
        return json_decode($response->getBody()->getContents(), true);
    }

    public function getGVLop($id)
    {
        $response = $this->client->request('GET', 'gvcn_info/'.$id);
        return json_decode($response->getBody()->getContents(), true);
    }

    public function getDiemSV($namhoc, $hocky, $masv) {
        $response = $this->client->request('GET', "diem_sv_t4?namhoc=".$namhoc."&hocky=".$hocky."&masv=".$masv);
        return json_decode($response->getBody()->getContents(), true);
    }

}
