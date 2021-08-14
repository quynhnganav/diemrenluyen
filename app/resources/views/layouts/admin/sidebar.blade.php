<div class="h-100 openSider sider position-relative" id='sider' style='background-color: #2A3F54;'>
    <div class="text-center logo-container">
        <h3 class='m-0'>
            <a href="/" class='text-decoration-none text-white text-uppercase'>VKU</a>
        </h3>
    </div>
    <div class='position-relative w-100 menu-wrap sidebar-left' style='height: calc(100% - 70px); max-height: calc(100% - 70px);'>
        <div class='position-absolute top-0'
            style='position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin-right: 0px; margin-bottom: 0px;'>
            <ul class='py-4'>
                <li class='d-block'>
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_MauTieuChi.index') }}">
                        <span style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-2' id='menu-text'>Danh mục Điểm rèn luyện</span>
                        </span>
                    </a>
                </li>
                <li class='d-block'>
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_MauTieuChi.index') }}">
                        <span style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-2' id='menu-text'>Danh mục Mẫu tiêu chí</span>
                        </span>
                    </a>
                </li>
                <li class='d-block'>
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_LopHoc.index') }}">
                        <span style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-2' id='menu-text'>Danh mục Lớp học</span>
                        </span>
                    </a>
                </li>
                <li class='d-block'>
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_HocKy.index') }}">
                        <span style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-2' id='menu-text'>Danh mục Học kỳ</span>
                        </span>
                    </a>
                </li>
                <li class='d-block'>
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_SinhVien.index') }}">
                        <span style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-2' id='menu-text'>Danh mục Sinh viên</span>
                        </span>
                    </a>
                </li>
                <li class='d-block'>
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_GiangVien.index') }}">
                        <span style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-2' id='menu-text'>Danh mục Giảng viên</span>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

{{-- <li class="nav-item nav-item-submenu @if (\Request::is('admin/posts') || \Request::is('admin/posts/*') || \Request::is('admin/categories') || \Request::is('admin/categories/*')) nav-item-open @endif">
    <a href="#" class="nav-link"><i class="icon-copy"></i> <span>Posts</span></a>
    <ul class="nav nav-group-sub" data-submenu-title="Layouts" style="@if (\Request::is('admin/posts') || \Request::is('admin/posts/*') || \Request::is('admin/categories') || \Request::is('admin/categories/*')) display:block @endif">
        <li class="nav-item"><a href="{{ route('posts.index') }}" class="nav-link @if(\Request::is('posts')) active @endif">List Posts</a></li>
        <li class="nav-item"><a href="{{ route('posts.create') }}" class="nav-link @if(\Request::is('posts/create')) active @endif">Create Post</a></li>
    </ul>

</li> --}}

@section('js')
    @parent
    <script>
        function openSider() {
            document.getElementById("sider")?.classList.toggle('openSider');
            document.getElementById("sider")?.classList.toggle('closeSider');
            document.getElementById("menu-text")?.classList.toggle('d-none');
            document.getElementById("nav")?.classList.toggle('togge-padding-left');
        }
        function checkWidthToggle() {
            document.getElementById("sider")?.classList.remove('openSider');
            document.getElementById("sider")?.classList.add('closeSider');
            document.getElementById("menu-text")?.classList.add('d-none');
            document.getElementById("nav")?.classList.add('togge-padding-left');
        }
        window.addEventListener("resize", function () {
            var w = window.innerWidth;
            if (w < 768) {
                checkWidthToggle()
            }
        })
        var w = window.innerWidth;
        if (w < 768) {
            checkWidthToggle()
        }
    </script>
@endsection