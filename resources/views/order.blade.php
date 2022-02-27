<!DOCTYPE html>
<html lang="en">
<head>
     <style class="style">
       td,th{
           text-align: center;
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
       .cursor-pointer{
           cursor: pointer;
           border-radius: 10px;
           padding: 5px;
           color: #000;
           background: #e9ecef;
       }
       .cursor-pointer:hover{
           background-color: #dee2e6;
           color: #000;
           transition-delay: 50ms;
       }
.blink {
  -webkit-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Safari 4+ */
  -moz-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Fx 5+ */
  -o-animation: NAME-YOUR-ANIMATION 1s infinite;  /* Opera 12+ */
  animation: NAME-YOUR-ANIMATION 1s infinite;  /* IE 10+, Fx 29+ */
}

@-webkit-keyframes NAME-YOUR-ANIMATION {
  0%, 49% {
    background-color: #e9ecef
    /* border: 3px solid #e50000; */
  }
  50%, 100% {
    background-color: #97b6cf
    /* border: 3px solid rgb(117, 209, 63); */
  }
}

.border-animation{
  background: linear-gradient(90deg, blue 50%, transparent 50%), linear-gradient(90deg, blue 50%, transparent 50%), linear-gradient(0deg, blue 50%, transparent 50%), linear-gradient(0deg, blue 50%, transparent 50%);
  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
  background-size: 4px 2px, 4px 2px, 2px 4px, 2px 4px;
  background-position: 0px 0px, 200px 100px, 0px 100px, 200px 0px;
  padding: 10px;
  animation: border-dance 2s infinite linear;
}
@keyframes border-dance {
  0% {
    background-position: 0% 0%, 100% 100%, 0% 100%, 100% 0%;
  }
  100% {
    background-position: 100% 0px, 0% 100%, 0% 0%, 100% 100%;
  }
}
     </style>
     <link type="style/css" href="{{asset('dist/js/plugins/calender/calender.css')}}">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-header d-flex p-0">
                <h3 class="card-title p-3">جزییات سفارش</h3>
              </div><!-- /.card-header -->
              <div class="card-body col-12 p-20">
                   <div class="row">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">نام سرویس : </span><span id="product-name">...</span>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">تعداد سفارش  : </span><span id="count-order">...</span>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">قیمت واحد : </span><span id="unit-price" >...</span><span> تومان</span>
                      </div>
                      <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 p-2">
                          <span class="font-weight-bold">قیمت کل : </span><span id="cost">...</span><span> تومان</span>
                      </div>
                   </div>

                   <div id="properties-div" class="row">

                   </div>
                   <div class="col-12 p-2">
                          <span class="font-weight-bold">وضعیت : </span><span id="status">...</span>
                   </div>
                   <div class="col-12 p-2">
                          <span class="font-weight-bold">زمان شروع : </span><span id="start-time">...</span>
                   </div>
                   <div class="col-12 p-2">
                          <span class="font-weight-bold">زمان پایان : </span><span id="end-time">...</span>
                   </div>
                   <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12" style="text-align: center">
                      <a id="btn-pay" href="{{env('PAYMENT_URL')}}?propertyType=ORDER&propertyId={{$order_id}}" style="display:none" class="btn btn-success pr-5 pl-5 mt-5">پرداخت</a>
                   </div>

                </div>
            </div>
            <!-- ./card -->
            <div class="card row" id="timing-card" style="display: none">
              <div class="card-header d-flex p-0">
                <h3 class="card-title p-3">زمان انجام سفارش</h3>
              </div><!-- /.card-header -->
              <div class="row">
                <div id="times" class="card-body col-xl-6 col-lg-6 col-md-12 col-sm-12"> </div>
              <div id="calender" class="card-body col-xl-6 col-lg-6 col-md-12 col-sm-12"></div>
              </div>
            </div>
          </div>
          <!-- /.col -->
        </div>
      </div><!-- /.container-fluid -->
    <script class="script">
        var orderId = '{{$order_id}}';
    </script>
    <script src="{{asset('dist/js/plugins/calender/calender.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/order.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/order-event.js')}}"></script>

</html>


