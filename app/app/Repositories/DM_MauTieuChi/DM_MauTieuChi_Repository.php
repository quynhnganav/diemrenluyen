<?php

namespace App\Repositories\DM_MauTieuChi;

use App\Models\DM_MauTieuChi;
use App\Repositories\BaseRepository;


class DM_MauTieuChi_Repository extends BaseRepository implements DM_MauTieuChi_RepositoryInterface
{

    public function getModel()
    {
        return DM_MauTieuChi::class;
    }

    public function delete($id)
    {
        $mauTieuChi = $this->find($id);
        if (empty($mauTieuChi)) return [404, "Không tìm thấy mẫu tiêu chí"];
        if ($mauTieuChi->PhatHanh) return [403, "Mẫu tiêu chí đã được phát hành, không thể xóa"];
        $this->model->where('id', $id)->delete($id);
        return [200, "Xóa thành công"];
    }

}
