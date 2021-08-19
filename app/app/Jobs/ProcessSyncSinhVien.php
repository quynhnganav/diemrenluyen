<?php

namespace App\Jobs;

use App\Models\DM_LopHoc;
use App\Repositories\SV\SV_Repository;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessSyncSinhVien implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $idLop;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($idLop)
    {
        $this->idLop = $idLop;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(SV_Repository $SV_Repository)
    {
        $SV_Repository->syncSinhVienLop($this->idLop);
        $lop = DM_LopHoc::find($this->idLop);
        $lop->isSync = false;
        $lop->save();
    }
}
