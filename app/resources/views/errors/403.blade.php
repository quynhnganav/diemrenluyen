{{--@extends('errors::minimal')--}}

{{--@section('title', __('Forbidden'))--}}
{{--@section('code', '403')--}}
{{--@section('message', __($exception->getMessage() ?: 'Forbidden'))--}}

@extends('errors::minimal')

@section('title', __('Không tìm thấy trang'))
@section('code', '404')
@section('message', __('Không tìm thấy trang'))
