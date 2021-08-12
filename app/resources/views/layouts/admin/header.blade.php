<div>
    <nav class="navbar navbar-light bg-white" id='nav'>
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <div>
                <i class='fa fa-bars' style='font-size: 26px; cursor: pointer' onClick='openSider()'> </i>
            </div>
            <div class='nav-right position-relative'>
                <div>
                    <img class='rounded-circle' src='http://daotao.vku.udn.vn/uploads/sinhvien/18IT285.jpg' />
                    <span>
                        @if (Auth::user())
                            {{ Auth::user()->name }}
                        @endif - 18IT5
                    </span>
                </div>
                <div class='position-absolute user-dropdown'>
                    <div>
                        <div class='dropdown-arrow'></div>
                        <div class='user-dropdown-content bg-white ' 
                        style='padding: 12px 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'>
                            {{-- <a href='/' class='dropdown-tag'>
                                <span><i class='fa fa-sign-out'></i></span>
                                <span>Logout</span>
                            </a> --}}
                            <a class="dropdown-item" href="{{ route('logout') }}"
                                        onclick="event.preventDefault();
                                                    document.getElementById('logout-form').submit();">
                                <span><i class='fa fa-sign-out'></i></span>
                                <span>Logout</span>
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</div>