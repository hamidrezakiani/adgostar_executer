<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title id="page-title"></title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link id="favicon" rel="icon" href="" type="image/jpeg" sizes="16x16">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="{{asset('dist/css/adminlte.min.css')}}">
  <!-- iCheck -->
  <link rel="stylesheet" href="{{asset('plugins/iCheck/square/blue.css')}}">
  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <!-- bootstrap rtl -->
  <link rel="stylesheet" href="{{asset('dist/css/bootstrap-rtl.min.css')}}">
  <!-- template rtl version -->
  <link rel="stylesheet" href="{{asset('dist/css/custom-style.css')}}">
</head>
<body class="hold-transition login-page">
<div class="login-box">
  <div class="login-logo">
    <h3><b>ورود به پنل مجری</b></h3>
  </div>
  <!-- /.login-logo -->
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">فرم زیر را تکمیل کنید و ورود بزنید</p>

      <form action="{{url('/login')}}" id="form-login" method="post">
        @csrf
        <div class="input-group mb-3">
          <input type="numeric" id="phone-input" name="phone" class="form-control" placeholder="موبایل">
          <div class="input-group-append">
            <span class="fa fa-phone input-group-text"></span>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="password" id="password-input" name="password" class="form-control" placeholder="رمز عبور">
          <div class="input-group-append">
            <span class="fa fa-lock input-group-text"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="checkbox icheck">
              <label>
                <input type="checkbox"> یاد آوری من
              </label>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-4">
            <button type="button" id="btn-submit" class="btn btn-primary btn-block btn-flat">ورود</button>

          </div>
          <!-- /.col -->
        </div>
      </form>
      <p class="mb-1">
        <a href="#">رمز عبورم را فراموش کرده ام.</a>
      </p>
      <p class="mb-0">
        <a href="register.html" class="text-center">ثبت نام</a>
      </p>
    </div>
    <!-- /.login-card-body -->
  </div>
</div>
<!-- /.login-box -->

<!-- jQuery -->
<script src="{{asset('plugins/jquery/jquery.min.js')}}"></script>
<!-- Bootstrap 4 -->
<script src="{{asset('plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
<!-- iCheck -->
<script src="{{asset('plugins/iCheck/icheck.min.js')}}"></script>
<script src="{{asset('plugins/notiflix/notiflix-aio-2.6.0.min.js')}}"></script>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass   : 'iradio_square-blue',
      increaseArea : '20%' // optional
    })
  })
</script>
<script>
 let domain = '{{$_SERVER['HTTP_HOST']}}';
 let api_token = null;
 let baseUrl = '{{url('')}}';
 let apiUrl = '{{env('API_URL')}}'
</script>
<script src="{{asset('dist/js/pages/login.js')}}"></script>
</body>
</html>
