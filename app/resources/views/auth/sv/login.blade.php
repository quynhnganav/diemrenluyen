@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <a href="{{ route('login.provider', 'google') }}" 
                        class="btn btn-secondary">{{ __('Google Sign in') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
