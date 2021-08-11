<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sinh viên - VKU</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="/css/cdn/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
    <link href="/js/cdn/bootstrap.min.js" type="text/javascript" />
    <link href="/js/cdn/popper.min.js" type="text/javascript" />
    <link rel="stylesheet" href="/css/home.css" type="text/css">
    <meta name="csrf-token" value="{{ csrf_token() }}" />
</head>

<body>
    <section class='w-100' style='height: 100vh'>
    <div>
    <nav class="navbar navbar-light bg-white"  id='nav'>
  <div class="container-fluid d-flex align-items-center justify-content-between">
      <div>
          <i class='fa fa-bars' style='font-size: 26px; cursor: pointer' onClick='openSider()'> </i>
      </div>
      <div class='nav-right position-relative'>
          <div>
         <img class='rounded-circle' src='http://daotao.vku.udn.vn/uploads/sinhvien/18IT285.jpg' />
         <span>Thái Thị Quỳnh Nga - 18IT5</span>
        </div>
        <div class='position-absolute user-dropdown'>
            <div>
            <div class='dropdown-arrow'></div>
            <div class='user-dropdown-content bg-white ' style='padding: 12px 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'>
            <a href='/' class='dropdown-tag' >
            <span><i class='fa fa-sign-out'></i></span>
            <span>Logout</span>
            </a>
            </div>
            </div>
        </div>
      </div>
   </div>
</nav>
    </div>
    <section class='d-flex overflow-x-hidden' style='height: 100vh'>
        <!-- SIDEBAR SECTION -->
   <div class="h-100 openSider sider position-relative" id='sider' style='background-color: #2A3F54;'>
    <div class="text-center logo-container">
    <h3 class='m-0'>
    <a href="/" class='text-decoration-none text-white text-uppercase'>VKU</a>
    </h3>
    </div>
    <div class='position-relative overflow-hidden w-100 menu-wrap' style='height: 298px'>
    <div class='position-absolute top-0' style='position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; overflow: scroll; margin-right: 0px; margin-bottom: 0px;'>
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
     <!-- SIDEBAR SECTION -->
   <div style='padding: 70px 0px 0px'>
   <div id="app"></div>
   </div>
</section>
   </section>
    <script src="{{ mix('js/app.js') }}" defer></script>
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
    <script>
        function openSider(){
            document.getElementById("sider").classList.toggle('openSider');
            document.getElementById("sider").classList.toggle('closeSider');
            document.getElementById("menu-text").classList.toggle('d-none');
            document.getElementById("nav").classList.toggle('togge-padding-left');
    }
    function checkWidthToggle(){
        document.getElementById("sider").classList.remove('openSider');
        document.getElementById("sider").classList.add('closeSider');
        document.getElementById("menu-text").classList.add('d-none');
        document.getElementById("nav").classList.add('togge-padding-left');
    }
    window.addEventListener("resize", function() {
    var w = window.innerWidth;
    console.log(w)
    if(w < 768) {
        checkWidthToggle()
    }
    })
    var w = window.innerWidth;
    if(w < 768) {
        checkWidthToggle()
    }
    </script>
</body>
</html>