<nav class="main-header navbar navbar-expand bg-white navbar-light border-bottom">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link">خانه</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">تماس</a>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="جستجو" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </form>

    <!-- Right navbar links -->
    <ul class="navbar-nav mr-auto">
        <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
              <i class="fa fa-user-o"></i>
              <span class="badge badge-danger navbar-badge">3</span>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-left">
                  <a href="" id="isAdmin" class="dropdown-item isAdmin">
                    <i class="fa fa-user ml-1"></i> پنل ادمین
                  </a>
                  <div class="dropdown-divider isExecuter"></div>
                  <a href="" target="_blank" class="dropdown-item isExecuter">
                    <i class="fa fa-user ml-2"></i> پنل مجری
                  </a>
                  <div class="dropdown-divider isAgent"></div>
                    <a href="" target="_blank" class="dropdown-item isAgent">
                      <i class="fa fa-user ml-1"></i> پنل نماینده
                    </a>
                  <div class="dropdown-divider isUser"></div>
                  <a href="" target="_blank" class="dropdown-item isUser">
                    <i class="fa fa-user ml-2"></i> پنل کاربری
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="{{url('logout')}}" class="dropdown-item">
                     خروج
                  </a>
            </div>
          </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i
                class="fa fa-th-large"></i></a>
      </li>
    </ul>
  </nav>
