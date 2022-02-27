$('.nav-link').removeClass('active');
$('.nav-item').removeClass('menu-open');
$('.nav-treeview').css('display','none');
$('#group-service-sidebar').addClass('active');
$('#create-service-sidebar').addClass('active');
$('#group-service-menu-open').addClass('menu-open');
$('#group-service-menu-open ul').css('display','block');
var productId = null;
var participationId = null;
setCategories('parents',null,document.getElementById('tree-services'));
function setCategories(flag,parent_id=null,element){
            let api = new Api();
            let response = api.getCategories(flag,parent_id);
            response.done(function(data,status){
                let categories = data['data']['categories'];
                var ul = document.createElement('UL');
                if(element.querySelector('.caret'))
                {
                  element.querySelector('.caret').classList.remove('fa-spinner');
                  element.querySelector('.caret').classList.remove('fa-spin');
                  element.querySelector('.caret').classList.add('fa-minus-square');
                  element.querySelector('.caret').classList.add('caret-down');
                  element.querySelector('.caret').classList.remove('caret');
                }
                for(key in categories)
                {
                    var item = categories[key];
                    if(item.count_subCat !=0 && item.show == 'YES')
                    {
                        var li = document.createElement('LI');
                        li.classList.add('tree-child');
                        var span = document.createElement('SPAN');
                        span.className = 'has-sub-cat caret fa fa-plus-square';
                        span.setAttribute('data-id',item.id);
                        li.appendChild(span);
                        var span2 = document.createElement('SPAN');
                        span2.innerHTML = `${item.label}(${item.count_subCat} زیر مجموعه)`;
                        li.appendChild(span2);
                        ul.appendChild(li);
                    }
                    else if(item.count_product != 0 && item.show == 'YES')
                    {
                        var li = document.createElement('LI');
                        li.classList.add('tree-child');
                        var span = document.createElement('SPAN');
                        span.className = 'has-product caret fa fa-plus-square';
                        span.setAttribute('data-id',item.id);
                        li.appendChild(span);
                        var span2 = document.createElement('SPAN');
                        span2.innerHTML = `${item.label}(${item.count_product} زیر محصول)`;
                        li.appendChild(span2);
                        ul.appendChild(li);
                    }
                }
                element.appendChild(ul);

            });
            response.fail(function(jqXHR, textStatus, errorThrown){
                if(jqXHR.status==0)
                {
                    Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                }
                    else
                {
                    var data =JSON.parse(jqXHR.responseText);
                    var errors = false;
                    for(key in data['errors'])
                    {
                        errors = true;
                        Notiflix.Notify.Failure(data['errors'][key]);
                    }
                    if(!errors)
                    Notiflix.Notify.Failure('خطای سرور');
                }
            });
}

function setProducts(flag,parent_id=null,element){
            let api = new Api();
            let response = api.getProducts(flag,parent_id);
            response.done(function(data,status){
                let products = data['data']['products'];
                var ul = document.createElement('UL');
                if(element.querySelector('.caret'))
                {
                  element.querySelector('.caret').classList.remove('fa-spinner');
                  element.querySelector('.caret').classList.remove('fa-spin');
                  element.querySelector('.caret').classList.add('fa-minus-square');
                  element.querySelector('.caret').classList.add('caret-down');
                  element.querySelector('.caret').classList.remove('caret');
                }
                for(key in products)
                {
                    var item = products[key];
                    var li = document.createElement('LI');
                    li.classList.add('tree-child');
                    li.setAttribute('data-name',item.name);
                    var span = document.createElement('SPAN');
                    span.setAttribute('data-id',item.id);
                    span.innerHTML = item.name;
                    span.classList.add('tree-product');
                    li.appendChild(span);
                    var span = document.createElement('SPAN');
                    if(item.participation == null)
                    {
                        li.classList.add('product-no-participated');
                        li.setAttribute('data-productId',item.id);
                        span.className = 'btn btn-info disabled';
                        span.style.fontSize = '12px';
                        span.innerHTML = 'مشارکت نشده';
                    }
                    else
                    {
                        li.classList.add('product-participated');
                        li.setAttribute('data-participationId',item.participation.id);
                        span.className = 'btn btn-success disabled';
                        span.style.fontSize = '12px';
                        span.innerHTML = 'مشارکت شده';
                    }
                    li.appendChild(span);
                    ul.appendChild(li);
                }
                element.appendChild(ul);

            });
            response.fail(function(jqXHR, textStatus, errorThrown){
                if(jqXHR.status==0)
                {
                    Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                }
                    else
                {
                    var data =JSON.parse(jqXHR.responseText);
                    var errors = false;
                    for(key in data['errors'])
                    {
                        errors = true;
                        Notiflix.Notify.Failure(data['errors'][key]);
                    }
                    if(!errors)
                    Notiflix.Notify.Failure('خطای سرور');
                }
            });
}


function setParticipationPeriods()
{
   let api = new Api();
   let response = api.getParticipationPeriods(participationId);
   response.done(function(data,status){
     let periods = data['data']['periods'];
                   if(periods.length == 0)
                   Notiflix.Notify.Warning('بازه ای یافت نشد');
                   periodDiv = document.getElementById('participation-periods');
                   periodDiv.innerHTML = '';
                   var countRow = 0;
                   for(key in periods)
                   {
                    item = periods[key];
                    var div = document.createElement('DIV');
                    var cardDiv = document.createElement('DIV');
                    cardDiv.className = 'card period-row col-12';
                    cardDiv.setAttribute('data-countRow',countRow);
                    div.className = 'row';
                    var colDiv = document.createElement('DIV');
                    colDiv.className = 'input-group mb-1 col-xl-3 col-lg-3 col-md-3 col-sm-12';
                    var divPrepend = document.createElement('DIV');
                    divPrepend.classList = 'input-group-prepend';
                    var span = document.createElement('SPAN');
                    span.className = 'btn btn-block btn-primary disabled';
                    span.innerHTML = 'از';
                    divPrepend.appendChild(span);
                    colDiv.appendChild(divPrepend);
                    var input = document.createElement('INPUT');
                    input.setAttribute('type','number');
                    input.className = 'form-control period-from';
                    input.setAttribute('data-countRow',countRow);
                    input.value = item.start;
                    input.disabled = true;
                    colDiv.appendChild(input);
                    div.appendChild(colDiv);
                    /////////////////
                    colDiv = document.createElement('DIV');
                    colDiv.className = 'input-group mb-1 col-xl-4 col-lg-4 col-md-4 col-sm-12';
                    divPrepend = document.createElement('DIV');
                    divPrepend.classList = 'input-group-prepend';
                    span = document.createElement('SPAN');
                    span.className = 'btn btn-block btn-primary disabled';
                    span.innerHTML = 'تا';
                    divPrepend.appendChild(span);
                    colDiv.appendChild(divPrepend);
                    input = document.createElement('INPUT');
                    input.setAttribute('type','number');
                    input.className = 'form-control period-to';
                    input.setAttribute('data-countRow',countRow);
                    input.setAttribute('placeholder','بی نهایت');
                    input.value = item.end;
                    if(key != periods.length - 1)
                    {
                          input.disabled = true;
                    }
                    colDiv.appendChild(input);
                    div.appendChild(colDiv);
                    //////////////
                    colDiv = document.createElement('DIV');
                    colDiv.className = 'input-group mb-1 col-xl-5 col-lg-5 col-md-5 col-sm-12';
                    divPrepend = document.createElement('DIV');
                    divPrepend.classList = 'input-group-prepend';
                    span = document.createElement('SPAN');
                    span.className = 'btn btn-block btn-primary disabled';
                    span.innerHTML = 'قیمت(تومان)';
                    divPrepend.appendChild(span);
                    colDiv.appendChild(divPrepend);
                    input = document.createElement('INPUT');
                    input.setAttribute('type','number');
                    input.className = 'form-control period-cost';
                    input.setAttribute('data-countRow',countRow);
                    input.setAttribute('placeholder','قیمت را وارد کنید');
                    input.value = item.cost;
                    colDiv.appendChild(input);
                    if(key == periods.length - 1 && countRow > 0)
                    {
                        divPrepend = document.createElement('DIV');
                        divPrepend.classList = 'input-group-prepend';
                        span = document.createElement('SPAN');
                        span.className = 'btn btn-block btn-danger fa fa-minus';
                        span.setAttribute('data-countRow',countRow);
                        span.setAttribute('id','remove-last-period');
                        divPrepend.appendChild(span);
                        colDiv.appendChild(divPrepend);
                    }
                    div.appendChild(colDiv);
                    ////////////
                    cardDiv.appendChild(div);
                    periodDiv.appendChild(cardDiv);
                    countRow++;
                    $('#add-new-period').attr('data-countRow',countRow);
                    $('#save-period-changes-edit').attr('data-countRow',countRow);
               }
   $('#manage-service-div').css('display','block');
   });
   response.fail(function(jqXHR, textStatus, errorThrown){

   });

}

function setFirstPeriodInput()
{
  var periodDiv = document.getElementById('participation-periods');
    var div = document.createElement('DIV');
    var cardDiv = document.createElement('DIV');
    cardDiv.className = 'card period-row col-12';
    cardDiv.setAttribute('data-countRow',0);
    div.className = 'row';
    var colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-3 col-lg-3 col-md-3 col-sm-12';
    var divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    var span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'از';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    var input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-from';
    input.setAttribute('data-countRow',0);
    input.value = 1;
    input.disabled = true;
    colDiv.appendChild(input);
    div.appendChild(colDiv);
    ///////////////
    colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-4 col-lg-4 col-md-4 col-sm-12';
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'تا';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-to';
    input.setAttribute('data-countRow',0);
    input.setAttribute('placeholder','بی نهایت');
    colDiv.appendChild(input);
    div.appendChild(colDiv);
    ///////////
    colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-5 col-lg-5 col-md-5 col-sm-12';
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'قیمت(تومان)';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-cost';
    input.setAttribute('data-countRow',0);
    input.setAttribute('placeholder','قیمت را وارد کنید');
    colDiv.appendChild(input);
    div.appendChild(colDiv);
    /////////
    cardDiv.appendChild(div);
    periodDiv.appendChild(cardDiv);
    $('#add-new-period').attr('data-countRow',1);
    $('#edit-participation-submit').attr('data-countRow',1);
    $('#create-participation-submit').attr('data-countRow',1);
    $('#manage-service-div').css('display','block');
}

function addNewPeriodInput(countRow,from)
{
    var periodDiv = document.getElementById('participation-periods');
    var div = document.createElement('DIV');
    var cardDiv = document.createElement('DIV');
    cardDiv.className = 'card period-row col-12';
    cardDiv.setAttribute('data-countRow',countRow);
    div.className = 'row';
    var colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-3 col-lg-3 col-md-3 col-sm-12';
    var divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    var span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'از';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    var input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-from';
    input.setAttribute('data-countRow',countRow);
    input.value = from;
    input.disabled = true;
    colDiv.appendChild(input);
    div.appendChild(colDiv);
    ///////////////
    colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-4 col-lg-4 col-md-4 col-sm-12';
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'تا';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-to';
    input.setAttribute('data-countRow',countRow);
    input.setAttribute('placeholder','بی نهایت');
    colDiv.appendChild(input);
    div.appendChild(colDiv);
    ///////////
    colDiv = document.createElement('DIV');
    colDiv.className = 'input-group mb-1 col-xl-5 col-lg-5 col-md-5 col-sm-12';
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-primary disabled';
    span.innerHTML = 'قیمت(تومان)';
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    input = document.createElement('INPUT');
    input.setAttribute('type','number');
    input.className = 'form-control period-cost';
    input.setAttribute('data-countRow',countRow);
    input.setAttribute('placeholder','قیمت را وارد کنید');
    colDiv.appendChild(input);
    divPrepend = document.createElement('DIV');
    divPrepend.classList = 'input-group-prepend';
    span = document.createElement('SPAN');
    span.className = 'btn btn-block btn-danger fa fa-minus';
    span.setAttribute('data-countRow',countRow);
    span.setAttribute('id','remove-last-period');
    divPrepend.appendChild(span);
    colDiv.appendChild(divPrepend);
    div.appendChild(colDiv);
    /////////
    cardDiv.appendChild(div);
    periodDiv.appendChild(cardDiv);
    countRow++;
    $('#add-new-period').attr('data-countRow',countRow);
    $('#edit-participation-submit').attr('data-countRow',countRow);
    $('#create-participation-submit').attr('data-countRow',countRow);
}

function storeParticipation(countPeriod)
{
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    var data = new FormData();
    var periodArray = {};
    var costError = false;
    var PeriodError = false;
    for(var i=0;i < countPeriod;i++)
    {
       var periodItem = {};
       periodItem.start = $(`.period-from[data-countRow=${i}]`).val();
       if(Number.parseInt($(`.period-to[data-countRow=${i}]`).val())||Number.parseInt($(`.period-to[data-countRow=${i}]`).val())==0)
       {
           periodItem.end = $(`.period-to[data-countRow=${i}]`).val();
           if(Number.parseInt(periodItem.end) <= Number.parseInt(periodItem.start))
           {
               PeriodError = true;
               $(`.period-to[data-countRow=${i}]`).addClass('input-error');
           }
       }
       periodItem.cost = $(`.period-cost[data-countRow=${i}]`).val();
       if(!Number.parseInt(periodItem.cost))
       {
          costError = true;
          $(`.period-cost[data-countRow=${i}]`).addClass('input-error');
       }
       periodArray[i] = periodItem;
    }
    console.log(periodArray);
    if(!costError && !PeriodError)
    {
       var data = new FormData();
           data.append('periodArray',`${JSON.stringify(periodArray)}`);
           data.append('product_id',productId);
           let api = new Api();
           let response = api.storeParticipation(data);
           response.done(function(data,status){
              $('#NotiflixLoadingWrap').remove();
              $('#create-participation-periods').html('');
               $('#create-participation').css('display','none');
               document.getElementById('selected-product').innerHTML = 'هیچ سرویسی انتخاب نشده!';
               document.getElementById('selected-product').className = 'text-warning';
               $(`.product-no-participated[data-productId=${productId}]`).attr('data-participationId',data['data'].id);
               $(`.product-no-participated[data-productId=${productId}] > span:eq(1)`).removeClass('btn-info');
               $(`.product-no-participated[data-productId=${productId}] > span:eq(1)`).addClass('btn-success');
               $(`.product-no-participated[data-productId=${productId}] > span:eq(1)`).html('مشارکت شده');
               $(`.product-no-participated[data-productId=${productId}]`).addClass('product-participated');
               $(`.product-participated[data-productId=${productId}]`).removeClass('product-no-participated');
               $('#manage-service-div').css('display','none');
               Notiflix.Report.Success("موفق",'مشارکت شما با موفقیت انجام شد پس از تایید مدیر منتظر دریافت سفارشات باشید','باشه');
            });
              response.fail(function(jqXHR, textStatus, errorThrown){
                  $('#NotiflixLoadingWrap').remove();
                   console.log(jqXHR.status);
                  console.log(textStatus);
                  console.log(errorThrown);
                  if(jqXHR.status==0)
                  {
                      Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                  }
                  else if(jqXHR.status != 403 && jqXHR.status != 401 && jqXHR.status != 422)
                  {
                    Notiflix.Report.Failure("خطا","خطای سرور","باشه");
                  }
                  else if(jqXHR.status == 403)
                  {
                      Notiflix.Report.Failure("خطا","شما قبلا در این سرویس مشارکت کرده اید","باشه");
                  }
                  else
                  {
                      var data = JSON.parse(jqXHR.responseText);
                      var errors = "";
                      for(key in data['errors'])
                      {
                          errors += data['errors'][key] + " , ";
                      }
                      Notiflix.Report.Failure("خطا",errors,'باشه');
                  }
              });
    }
    else
    {
        $('#NotiflixLoadingWrap').remove();
        if(costError)
          Notiflix.Report.Failure('خطا','فیلد قیمت نمیتواند خالی باشد.','باشه');

        if(PeriodError)
          Notiflix.Report.Failure("خطا","پایان بازه باید بزرگتر از شروع بازه باشد.","باشه");
    }
}

function editParticipationPeriods(countPeriod)
{
    Notiflix.Loading.Pulse('لطفا صبر کنید...');
    var data = new FormData();
    var periodArray = {};
    var costError = false;
    var PeriodError = false;
    for(var i=0;i < countPeriod;i++)
    {
       var periodItem = {};
       periodItem.start = $(`.period-from[data-countRow=${i}]`).val();
       if(Number.parseInt($(`.period-to[data-countRow=${i}]`).val())||Number.parseInt($(`.period-to[data-countRow=${i}]`).val())==0)
       {
           periodItem.end = $(`.period-to[data-countRow=${i}]`).val();
           if(Number.parseInt(periodItem.end) <= Number.parseInt(periodItem.start))
           {
               PeriodError = true;
               $(`.period-to[data-countRow=${i}]`).addClass('input-error');
           }
       }
       periodItem.cost = $(`.period-cost[data-countRow=${i}]`).val();
       if(!Number.parseInt(periodItem.cost))
       {
          costError = true;
          $(`.period-cost[data-countRow=${i}]`).addClass('input-error');
       }
       periodArray[i] = periodItem;
    }
    console.log(periodArray);
    if(!costError && !PeriodError)
    {
       var data = new FormData();
           data.append('periodArray',`${JSON.stringify(periodArray)}`);
           data.append('product_id',productId);
           let api = new Api();
           let response = api.updateParticipationPeriods(data,participationId);
           response.done(function(data,status){
              $('#NotiflixLoadingWrap').remove();
               $('#create-participation').css('display','none');
               document.getElementById('selected-product').innerHTML = 'هیچ سرویسی انتخاب نشده!';
               document.getElementById('selected-product').className = 'text-warning';
              Notiflix.Report.Success("موفق",'بازه ها با موفقیت ویرایش شد.','باشه');
            });
              response.fail(function(jqXHR, textStatus, errorThrown){
                  $('#NotiflixLoadingWrap').remove();
                   console.log(jqXHR.status);
                  console.log(textStatus);
                  console.log(errorThrown);
                  if(jqXHR.status==0)
                  {
                      Notiflix.Report.Failure("خطا","لطفا اینترنت خود را برسی کنید","باشه");
                  }
                  else if(jqXHR.status != 403 && jqXHR.status != 401 && jqXHR.status != 422)
                  {
                    Notiflix.Report.Failure("خطا","خطای سرور","باشه");
                  }
                  else if(jqXHR.status == 403)
                  {
                      Notiflix.Report.Failure("خطا","شما قبلا در این سرویس مشارکت کرده اید","باشه");
                  }
                  else
                  {
                      var data = JSON.parse(jqXHR.responseText);
                      var errors = "";
                      for(key in data['errors'])
                      {
                          errors += data['errors'][key] + " , ";
                      }
                      Notiflix.Report.Failure("خطا",errors,'باشه');
                  }
              });
    }
    else
    {
        $('#NotiflixLoadingWrap').remove();
        if(costError)
          Notiflix.Report.Failure('خطا','فیلد قیمت نمیتواند خالی باشد.','باشه');

        if(PeriodError)
          Notiflix.Report.Failure("خطا","پایان بازه باید بزرگتر از شروع بازه باشد.","باشه");
    }
}

