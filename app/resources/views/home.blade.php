<a class="dropdown-item" href="{{ route('logout') }}"
   onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">
    <span><i class='fa fa-sign-out'></i></span>
    <span>Logout</span>
</a>
<form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
    @csrf
</form>
