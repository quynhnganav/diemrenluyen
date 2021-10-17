<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel = "icon" href =
    "/images/logo.png"
          type = "image/x-icon">

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="/css/cdn/bootstrap.min.css" type="text/css" rel="stylesheet" />
    <link href="/js/cdn/bootstrap.min.js" type="text/javascript" />
    <link href="/js/cdn/popper.min.js" type="text/javascript"rel="stylesheet" />
    <link href="/css/home.css" type="text/css" rel="stylesheet">

</head>
<body>
    <div id="app">
        <main class="py-4">
            @yield('content')
        </main>
    </div>

    <script>
        function dropdown() {
            console.log('avatar-dropdown')
        }
    </script>
</body>
</html>
