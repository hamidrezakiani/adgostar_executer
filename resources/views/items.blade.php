<html lang="en">
<head>
    <link class="style" rel="stylesheet" href="{{asset('plugins/switch-toggle/switch-toggle.css')}}">
     <style class="style">
         td{
            word-break: break-all;
            text-align: center;
         }
         .input-label{
            font-size: 12px;
         }
         .input-name{
            font-size: 12px;
         }
       th{
           text-align: center;
       }
       .operator{
           padding: 1px,1px,1px,1px;
           font-size: 10px;
           margin: 2px;
       }
       .operator.remove-category
       {
           font-size: 14px;
       }
       .operator.add-subCat
       {
        font-size: 12px;
       }
       .category-operator{
           width: 18%;
       }
       .category-label{
           width: 18%;
           font-size: 14px;
       }
       .category-name{
           width: 18%;
           font-size: 14px;
       }
       .category-parent{
           width: 18%;
           font-size: 14px;
       }
       .category-details{
           width: 12%;
           font-size: 12px;
       }

       .category-show-parent{
           width: 18%;
           font-size: 14px;
       }
       .breadcrumb-item a{
          color: inherit;
          cursor: pointer;
       }
       .breadcrumb-item.active a{
           color: blueviolet;
       }
       #add-subCat-name{
           text-decoration: underline;
           color:chartreuse;
           cursor: pointer;
       }
     </style>
</head>
<body>
    <div class="container-fluid">
        <div class="row" id="categories">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">محصولات</h3>
                  <div class="card-tools">
                    <div class="input-group input-group-sm" style="width: 150px;">
                        <div class="input-group-append">
                            <button data-url='/products-create' class="btn btn-success page-links">افزودن محصول</button>
                        </div>
                    </div>
                  </div>
                </div>
                <!-- /.card-header -->
                <div class="card-body table-responsive p-0">
                  <table  class="table table-hover">
                    <thead>
                        <tr>
                            {{-- <th>ردیف</th> --}}
                            <th>نام آینم</th>
                            <th>نام محصول</th>
                            <th>وضعیت انتشار</th>
                            <th>عملیات</th>
                          </tr>
                    </thead>
                    <tbody id="item-table">

                    </tbody>
                  </table>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    <script class="script">
      var pageProductId = '{{$product_id}}';
      var pageFlag = '{{$flag}}';
    </script>
    <script class="script" src="{{asset('dist/js/pages/items.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/items-event.js')}}"></script>
</body>
</html>


