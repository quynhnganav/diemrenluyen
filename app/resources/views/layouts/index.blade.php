<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sinh viên - VKU</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="/css/cdn/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="/js/cdn/bootstrap.min.js" type="text/javascript" />
    <link href="/js/cdn/popper.min.js" type="text/javascript"rel="stylesheet" />
    <link href="/css/home.css" type="text/css" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" type="text/css" rel="stylesheet" />
    @yield('css')
    <meta name="csrf-token" value="{{ csrf_token() }}" />
</head>

<body>
    <section class='w-100' style='height: 100vh'>
        @yield('header')
        <section class='d-flex' style='height: 100vh'>
            <!-- SIDEBAR SECTION -->
            @yield('sidebar')
                <!-- SIDEBAR SECTION -->
           
            <div style='padding: 70px 0px 0px; background: #fafafa; width: calc(100% - 80px); overflow-x: hidden; ' >
                @yield('content')
            </div>
           
        </section>
    </section>
    @yield('js')
</body>

</html>