<div class="h-100 sider  position-relative" id='sider' style='background-color: #2A3F54;'>
    <div class='h-100 overflow-hidden'>
        <div class="text-center logo-container">
            <h3 class='m-0'>
                <a href="/" class='text-decoration-none text-white text-uppercase'>VKU</a>
            </h3>
        </div>
        <div class='position-relative w-100 menu-wrap sidebar-left'
            style='height: calc(100% - 70px); max-height: calc(100% - 70px);'>
            <div class='position-absolute top-0'
                style='position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin-right: 0px; margin-bottom: 0px;'>
                
                <div class="ps-2 pe-2 menu-item-inline @if (\Request::is('admin/DM_DiemRenLuyen') || \Request::is('admin/DM_DiemRenLuyen/*')) menu-item-selected @endif">
                    <button type="button" class="btn d-flex align-items-center justify-content-center">
                        <a class='text-decoration-none text-white' href="{{ route('admin.DM_DiemRenLuyen.index') }}">
                            <span style='color: rgb(120, 129, 149)' class="children-item">
                                <i class='fa fa-street-view'></i>
                                <span class='ps-3 menu-inline-text menu-tille' id='menu-text'>Điểm rèn luyện</span>
                            </span>
                        </a>
                    </button>
                </div>
                <div class="ps-2 pe-2 menu-item-inline @if (\Request::is('admin/DM_MauTieuChi') || \Request::is('admin/DM_MauTieuChi/*')) menu-item-selected @endif">
                    <button type="button" class="btn d-flex align-items-center justify-content-center">
                        <a class='text-decoration-none text-white' href="{{ route('admin.DM_MauTieuChi.index') }}">
                            <span style='color: rgb(120, 129, 149)' class="children-item">
                                <i class='fa fa-street-view'></i>
                                <span class='ps-3 menu-inline-text menu-tille' id='menu-text'>Mẫu tiêu chí</span>
                            </span>
                        </a>
                    </button>
                </div>
                <div class="ps-2 pe-2 menu-item-inline @if (\Request::is('admin/DM_DotDanhGia') || \Request::is('admin/DM_DotDanhGia/*')) menu-item-selected @endif">
                    <button type="button" class="btn d-flex align-items-center justify-content-center">
                        <a class='text-decoration-none text-white' href="{{ route('admin.DM_DotDanhGia.index') }}">
                            <span style='color: rgb(120, 129, 149)' class="children-item">
                                <i class='fa fa-street-view'></i>
                                <span class='ps-3 menu-inline-text menu-tille' id='menu-text'>Đợt đánh giá</span>
                            </span>
                        </a>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

@section('js')
@parent
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"></script>
<script>

</script>
<script>
    function openSider() {
        document.getElementById("sider")?.classList.toggle('closeSider');
        document.getElementById("nav")?.classList.toggle('togge-padding-left');
    }
    // document.getElementById(window.location.href.split("/").pop())?.classList.add('menu-item-selected');
    // var id = ['id1', 'id2']
    // function openMenu() {
    //     for (const key in id) {
    //         document.getElementById(id[key])?.classList.toggle('d-none');
    //     }
    // }


</script>

@endsection