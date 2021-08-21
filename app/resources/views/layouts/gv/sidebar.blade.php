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
                    <a class='text-decoration-none  text-white '>
                        <span style='color: rgb(120, 129, 149)'>
                            <i class='fa fa-street-view'></i>
                            <span class='ps-2' id='menu-text'>Lí lịch sinh viên</span>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</div>

@section('js')
    @parent
    <script>
        function openSider() {
            document.getElementById("sider")?.classList.toggle('openSider');
           
           
        }
       
    </script>
@endsection