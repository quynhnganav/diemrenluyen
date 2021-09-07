<?php

namespace App\Common;

class Helper {

    public static function hocKyToLaMa($hocky) {
        switch ($hocky){
            case 1: return "I";
            case 2: return "II";
            default: return "";
        }
    }

    public static function diemToXepLoai($diem) {
        if ($diem >=90) return "Xuất sắc";
        if ($diem >=80) return "Tốt";
        if ($diem >=65) return "Khá";
        if ($diem >=50) return "Trung bình";
        if ($diem >=35) return "Yếu";
        if ($diem >=0) return "Kém";
        return "";
    }

}
