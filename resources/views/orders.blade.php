<!DOCTYPE html>
<html lang="en">
<head>
     <style class="style">
       th{
           text-align: right;
           cursor: pointer;
       }

       .arrow{
           font-size: 20px;
           margin-right: 8px;
           color: #999;
       }

       #btn-back{
           font-size: 20px;
           color: #999;
           display: none;
       }

       .card-body table-responsive p-0{
            max-height: 80vmax;
       }


     </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <!-- Custom Tabs -->
            <div class="card">
              <div class="card-header d-flex p-0">
                <h3 class="card-title p-3">سفارشات</h3>
                <ul class="nav nav-pills ml-auto p-2">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
                      <span id="span-filter">همه</span> <span class="caret"></span>
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item orders-filter" tabindex="-1" data-flag='TIMING'>در انتظار تایید زمان</a>
                      <a class="dropdown-item orders-filter" tabindex="-1" data-flag='NOT_STARTED'>شروع نشده</a>
                      <a class="dropdown-item orders-filter" tabindex="-1" data-flag='DOING'>در حال انجام</a>
                      <a class="dropdown-item orders-filter" tabindex="-1" data-flag="FINISHED">پایان یافته</a>
                      <a class="dropdown-item orders-filter" tabindex="-1" data-flag="CLOSED">بسته شده</a>
                      <a class="dropdown-item orders-filter" tabindex="-1" data-flag="CANCELED">لغو شده</a>
                      <a class="dropdown-item orders-filter" tabindex="-1" data-flag='ALL'>همه</a>
                    </div>
                  </li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane active" id="tab_1">
                     <table class="table table-active fs">
                       <thead class="thead-dark">
                           <tr>
                               <th>کد سفارش</th>
                               <th>نام سرویس</th>
                               <th>تعداد</th>
                               <th>مبلغ</th>
                               <th>وضعیت</th>
                               <th>عملیات</th>
                           </tr>
                       </thead>
                       <tbody id="table-orders">

                       </tbody>
                     </table>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- ./card -->
          </div>
          <!-- /.col -->
        </div>
      </div><!-- /.container-fluid -->
    <script class="script">
        var flag = '{{$flag}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/orders.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/orders-event.js')}}"></script>
</body>
</html>


