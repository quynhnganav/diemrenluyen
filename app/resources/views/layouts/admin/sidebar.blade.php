<div class="h-100 sider  position-relative" id='sider' style='background-color: #2A3F54;'>
<div class='h-100 overflow-hidden'>
    <div class="text-center logo-container">
        <h3 class='m-0'>
            <a href="/" class='text-decoration-none text-white text-uppercase'>VKU</a>
        </h3>
    </div>
    <div class='position-relative w-100 menu-wrap sidebar-left' style='height: calc(100% - 70px); max-height: calc(100% - 70px);'>
        <div class='position-absolute top-0'
            style='position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin-right: 0px; margin-bottom: 0px;'>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item menu-item-inline" id='DM_MauTieuChi'>
                    <button class="accordion-button d-flex align-items-center justify-content-center" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span class='d-flex align-items-center' style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-3 menu-inline-text text-capitalize menu-tille' id='menu-text'>Mẫu tiêu chí</span>
                        </span>
                    </button>
                  <div id="collapseOne" class="ps-5 pe-2 children-menu-item accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" >
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_MauTieuChi.index') }}">
                        <span class="d-flex align-items-center children-item" style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-3 menu-inline-text text-capitalize menu-children-tille' id='menu-text'>Điểm rèn luyện</span>
                        </span>
                    </a>
                  </div>
                </div>
            </div> 
            <div class="ps-2 pe-2 menu-item-inline" id='DM_LopHoc'>  
                    <button  type="button" class="btn d-flex align-items-center justify-content-center">
                        <a class='text-decoration-none text-white' href="{{ route('admin.DM_LopHoc.index') }}">
                            <span style='color: rgb(120, 129, 149)' class="children-item">
                                <i class='fa fa-street-view'></i>
                                <span class='ps-3 menu-inline-text menu-tille' id='menu-text'>Danh mục Lớp học</span>
                            </span>
                        </a>
                    </button>
                  
               
            </div>  
            <div class="ps-2 pe-2 menu-item-inline" id='DM_HocKy'>  
                <button  type="button" class="btn d-flex align-items-center justify-content-center">
                    <a class='text-decoration-none text-white' href="{{ route('admin.DM_HocKy.index') }}">
                        <span style='color: rgb(120, 129, 149)' class="children-item">
                            <i class='fa fa-street-view'></i>
                            <span class='ps-3 menu-inline-text menu-tille' id='menu-text'>Học kỳ</span>
                        </span>
                    </a>
                </button>
              
           
        </div>  
        <div class="ps-2 pe-2 menu-item-inline" id='DM_SinhVien'>  
            <button  type="button" class="btn d-flex align-items-center justify-content-center">
                <a class='text-decoration-none text-white' href="{{ route('admin.DM_SinhVien.index') }}">
                    <span style='color: rgb(120, 129, 149)' class="children-item">
                        <i class='fa fa-street-view'></i>
                        <span class='ps-3 menu-inline-text menu-tille' id='menu-text'>Sinh viên</span>
                    </span>
                </a>
            </button>
          
       
    </div>  
    <div class="ps-2 pe-2 menu-item-inline" id='DM_GiangVien'>  
        <button  type="button" class="btn d-flex align-items-center justify-content-center">
            <a class='text-decoration-none text-white' href="{{ route('admin.DM_GiangVien.index') }}">
                <span style='color: rgb(120, 129, 149)' class="children-item">
                    <i class='fa fa-street-view'></i>
                    <span class='ps-3 menu-inline-text menu-tille' id='menu-text'>Giảng viên</span>
                </span>
            </a>
        </button>
      
   
</div>  

        </div>
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script>

    </script>
    <script>
        function openSider() {
            document.getElementById("sider")?.classList.toggle('closeSider');
            document.getElementById("nav")?.classList.toggle('togge-padding-left');
        }
        document.getElementById(window.location.href.split("/").pop())?.classList.add('menu-item-selected');
        var id = ['id1', 'id2']
        function openMenu() {
            for(const key in id) {
                document.getElementById(id[key])?.classList.toggle('d-none');
            }
        }
        

    </script>
    
@endsection
