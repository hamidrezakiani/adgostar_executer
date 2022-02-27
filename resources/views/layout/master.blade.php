<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title id="page-title">@yield('title')</title>
    <link id="favicon" rel="icon" href="" type="image/jpeg" sizes="16x16">
    @include('layout.style')
    <style>
        .errors{
            display: none;
        }
        .isAdmin,.isAgent,.isUser,.isExecuter{
            display: none;
        }
    </style>
    @yield('style')
</head>
<body class="hold-transition sidebar-mini">
    <div class="wrapper">
        @include('layout.header')
        @include('layout.sidebar')
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <div class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1 class="m-0 text-dark" id="section-title">@yield('header-title')</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                  <ol class="breadcrumb float-sm-left" id="page-routes">

                  </ol>
                </div><!-- /.col -->
              </div><!-- /.row -->
            </div><!-- /.container-fluid -->
          </div> <!-- /.content-header -->
          <section class="content" id="content">

          </section>
        </div> <!-- /.content-wrapper -->
        <footer class="main-footer">
            <strong>CopyLeft &copy; 2018 <a href="http://github.com/hesammousavi/">حسام موسوی</a>.</strong>
        </footer>

          <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
          <!-- /.control-sidebar -->
    </div><!-- ./wrapper -->
    @include('layout.script')
    <script>
        let api_token;
        let apiUrl = '{{env('API_URL')}}';
        let pageUrl = '{{url($url)}}';
        let baseUrl =  '{{url('')}}';
        user = '{{auth()->user()}}';
        api_token = '{{auth()->user()->api_token}}';
        let api;
        let servicesPageScript = false;
        let servicesCreatePageScript = false;
        let ordersPageScript = false;
        let calenderPageScript = false;
         let calenderPageScript2 = false;
        let itemPageScript = false;
    </script>
    <script src="{{asset('dist/js/api/api.js')}}"></script>
    <script src="{{asset('dist/js/pages/master.js')}}"></script>
    @yield('script')
</body>
</html>
