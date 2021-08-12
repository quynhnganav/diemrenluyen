@extends('layouts.index')

@section('css')
<style>
    .main-loader {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main-loader .loader {
        border: 5px solid #f3f3f3;
        /* Light grey */
        border-top: 5px solid #3498db;
        /* Blue */
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 2s linear infinite;
    }
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>
@endsection

@section('sidebar')
    @component('layouts.admin.sidebar')
        
    @endcomponent
@endsection

@section('header')
    @component('layouts.admin.header')
        
    @endcomponent
@endsection

@section('content')
    <div id="app" class="app" @if (!empty($data)) data-data='{!! json_encode($data) !!}' @endif>
        <div class="main-loader">
            <div class="loader"></div>
        </div>
    </div>
@endsection

@section('js')
    <script src="{{ mix('js/app.js') }}" defer></script>
    <script src="{{ mix('js/manifest.js') }}" defer></script>
    <script src="{{ mix('js/vendor.js') }}" defer></script>
@endsection