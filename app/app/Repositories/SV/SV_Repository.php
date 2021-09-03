<?php

namespace App\Repositories\SV;

use Illuminate\Support\Str;
use App\Helper\PhoneNumber;
use App\Models\SV;
use App\Models\User;
use App\Repositories\BaseRepository;
use App\Services\DTAPIService;


class SV_Repository extends BaseRepository implements SV_RepositoryInterface
{
    private $apiDaoTao;

    public function __construct(DTAPIService $daotaoAPI) {
        $this->apiDaoTao = $daotaoAPI;
        $this->setModel();
    }

    public function getModel()
    {
        return SV::class;
    }

    public function search($text)
    {
        $text = Str::slug($text, " ");
        $source = $this->model->whereHas('user', function ($query) use ($text) {
            $query->where('HoTenKhongDau', 'like', '%' . $text . '%');
        })->with(['user', 'lopHoc'])->paginate(20);
        return $source;
    }

    public function syncSinhVienLop($idLop)
    {
        $sv = $this->apiDaoTao->getDanhSachSVLop($idLop);
        collect($sv)->each(function ($item) use($idLop) {
            try {
                $item = (object) $item;
                $newSv = $this->model->updateOrCreate(['id' => $item->id], [
                    'id' => $item->id,
                    'LopHoc_Id' => $idLop,
                    'MaSV' => $item->masv,
                    'TenNganh' => $item->tennganh,
                    'TrangThai' => $item->trangthai,
                    'GhiChu' => $item->ghichu,
                ]);

                $user = User::updateOrCreate(['email' => $item->email], [
                    'Profile_id' => $newSv->id,
                    'Profile_type' => 'App\Models\SV',
                    'Ten' => $item->ten,
                    'HoDem' => $item->hodem,
                    'HoTenKhongDau' => Str::slug($item->hodem." ".$item->ten, " "),
                    'email' => $item->email,
                    'username' => $item->email,
                    'SoDienThoai' => PhoneNumber::convert($item->dienthoai),
                    'SoDienThoaiGiaDinh' => PhoneNumber::convert($item->dienthoaigiadinh),
//                'NgaySinh' => $item->ngaysinh,
                    'GioiTinh' => $item->gioitinh,
                ]);
                $user->assignRole('sv');
            } catch (\Exception $e) {

            }
        });
        return "Đồng bộ thành công";
    }

    public function findSVByIdOrMaSv($id, $with)
    {
        return is_numeric($id) ?  $this->model->where('id', $id)->with($with)->first() : $this->model->where('MaSV', $id)->with($with)->first();
    }

}
