<html lang="en">
<head>
<style>
  /* Remove default bullets */
  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield !important;
}
#manage-service-div{
    display: none;
}
#multiple-type div{
    float: right;
}
#create-participation{
    display: none;
}
#product-name{
    margin: 6px;
}
#edit-participation{
    display: none;
    margin: 10px 5px;
}
#product-title{
    margin-left: 5px;
    font-weight: bold;
    font-size: 16px;
}
ul, #tree-services {
  list-style-type: none;
}
.tree-child{
  margin: 0px 10px 0px 0px;
  direction: rtl;
  border-right: 1px solid rgb(164, 72, 250);
  position: relative;
  padding: 10px 10px 10px 0;
}
.tree-child::before {
    content: "";
    display: block;
    color: rgb(164, 72, 250);
    width: 13px;
    height: 0;
    border-top: 1px solid;
    margin-top: 10px;
    position: absolute;
    right: 0px;
}
.tree-child ul{
    /* border-right: 1px solid black; */
    /* margin-right: 8px; */
}
.tree-child span{
    padding: 2px;
}
/* Remove margins and padding from the parent ul */
#tree-services {
  margin: 0;
  padding: 0;
  overflow: scroll;
  background-color:#fff;
  height: 32em;
}
#add-period-card{
  margin: 0;
  padding: 0;
  overflow: scroll;
  background-color:#fff;
  height: 32em;
}

/* Style the caret/arrow */
.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
  /* margin: 0px 2px; */
  color: rgb(164, 72, 250);
  font-size: 18px;
}

.caret-down{
    color: rgb(164, 72, 250);
}
.tree-product{
    cursor: pointer;
}
/* Create the caret/arrow with a unicode, and style it */
.caret::before {

  display: inline-block;
  /* margin-left: 6px; */
}

.no-caret{
  margin-right: 23px;
}

/* Rotate the caret/arrow icon when clicked on (using JavaScript) */


/* Hide the nested list */
.tree-nested {
  display: none;
}

/* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
.active {
  display: block;
}
.input-error{
    background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(255,156,186,1) 0%);
}

#period-create-detail{
           margin: 6px;
       }
       #period-create-detail span{
           display: block;
           margin-bottom: 10px;
       }
       #period-create-detail button{
           float: left;
           margin-right: 2px;
       }
</style>
</head>
<body>
    <div class="container-fluid">
        <div class="row">
           <div class="col-12 alert alert-info alert-dismissible">
                  <h5><i class="icon fa fa-info"></i> توجه!</h5>
                  ابتدا محصول را انتخاب کنید!
            </div>
         <div class="card col-xl-5 col-lg-5 col-md-6 col-sm-12" id="tree-services">
         </div>
         <div class="card col-xl-7 col-lg-7 col-md-6 col-sm-12" id="add-service-card">
           <p id="product-name">
               <span id="product-title">نام سرویس :</span>
               <span id="selected-product" class="text-warning">هیچ سرویسی انتخاب نشده!</span>
           </p>
           <div id="manage-service-div">
              <p id="period-create-detail">
                    <span>تعریف بازه</span>
                    <button id="remove-all-periods" class="btn btn-danger">پاک کردن بازه ها</button>
                    <button id="refresh-item-periods" class="btn btn-info fa fa-refresh"></button>
              </p>
              <div id="participation-periods" class="form-group">

              </div>
              <div class="form-group">
                    <button class="btn btn-primary fa fa-plus" id="add-new-period"></button>
              </div>
              <div class="form-group">
                 <button type="submit" id="edit-participation-submit" class="btn btn-primary">ذخیره تغییرات</button>
              </div>
              <div class="form-group">
                 <button type="submit" id="create-participation-submit" class="btn btn-success">ثبت و مشارکت</button>
              </div>
           </div>
         </div>
        </div>
      </div><!-- /.container-fluid -->
    <script class="script" src="{{asset('dist/js/pages/services-create.js')}}"></script>
    <script class="script" src="{{asset('dist/js/pages/services-create-event.js')}}"></script>
</body>
</html>


