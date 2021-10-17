<div>
    <nav class="navbar navbar-light bg-white" id='nav'>
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <div>
                <i class='fa fa-bars' style='font-size: 26px; cursor: pointer' onClick='openSider()'> </i>
            </div>
            <div class='nav-right position-relative'>
                <div onClick='openDropdown()'>
                    <img class='rounded-circle' src='/images/logo.png' />
                    <span>
                        @if (!empty(Session::get('sv')))
                            {{ Session::get('sv')->hodem }} {{ Session::get('sv')->ten }} - {{ Session::get('sv')->lopHoc->tenlop  }}
                        @endif
                    </span>
                </div>
                <div id="drop-down" class='position-absolute user-dropdown d-none'>
                    <div>
                        <div class='dropdown-arrow' style="
                        position: absolute;
                        display: block;
                        width: 8.5px;
                        background: transparent;
                        height: 8.5px;
                        border: 4.25px solid white;
                        transform: rotate(45deg);
                        /* z-index: -1; */
                        top: -5px;
                        left: 71px;
                    "></div>
                        <div class='user-dropdown-content bg-white '
                        style='box-shadow: rgb(0 0 0 / 20%) 0px 2px 10px; border-radius: 4px; '>
                            <a  href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();"
                                class='dropdown-tag w-100 d-flex' style="padding: 7px 15px">
                                <span><i class='fa fa-sign-out'></i></span>
                                <span class="ps-2">Logout</span>
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
