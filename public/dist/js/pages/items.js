loadItems(pageProductId,pageFlag);
function updateItem(data,id)
          {
           let api = new Api();
           let response = api.updateItem(data,id);
           response.done(function(data,status){
              Notiflix.Notify.Success('با موفقیت ویرایش شد');
              loadItems(pageProductId,pageFlag);
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               console.log(jqXHR.status);
               console.log(textStatus);
               console.log(errorThrown);
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
                       Notiflix.Notify.Failure(data['errors'][key][0]);
                   }
                   if(!errors)
                   Notiflix.Notify.Failure('خطای سرور');
               }
           });
}

function loadItems(product_id = null,flag = 'all')
          {
           let api = new Api();
           let response = api.getItems(flag,product_id);
           response.done(function(data,status){
               $('.notiflix-block-wrap').remove();
               let items = data['data']['items'];
               var table = document.getElementById('item-table');
               table.innerHTML = '';
               if(items.length == 0)
               Notiflix.Notify.Warning('آیتمی یافت نشد');
               for(key in items)
               {
                  var item = items[key];
                  var tr = document.createElement('TR');
                  var td = document.createElement('TD');
                  td.innerHTML = ++key;
                  // tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('item-name');
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.name;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  td.classList.add('item-productName');
                //   td.classList.add('page-links');
                  td.setAttribute('date-url',`/products?product_id=${item.product_id}`);
                  td.setAttribute('data-id',item.id);
                  td.innerHTML = item.productName;
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  var label = document.createElement('LABEL');
                  label.classList.add('switch');
                  var input = document.createElement('INPUT');
                  input.setAttribute('type','checkbox');
                  input.setAttribute('data-id',item.id);
                  input.classList.add('item-viewable');
                  if(item.viewable == 'YES')
                  input.checked = "checked";
                  var span = document.createElement('SPAN');
                  span.classList.add('toggle-switch');
                  label.appendChild(input);
                  label.appendChild(span);
                  td.appendChild(label);
                  tr.appendChild(td);
                  td = document.createElement('TD');
                  button = document.createElement('BUTTON');
                  button.className = 'btn btn-danger fa fa-trash operator remove-item';
                  button.setAttribute('data-id',item.id);
                  td.appendChild(button);
                  tr.setAttribute('data-id',item.id);
                  tr.appendChild(td);
                  tr.classList.add('product');
                  tr.style.cursor = 'pointer';
                  table.appendChild(tr);
               }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               $('#NotiflixLoadingWrap').remove();
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
               console.log(jqXHR.status);
               console.log(textStatus);
               console.log(errorThrown);
           });
}

function setProductsSelectOptions(element){
    let api = new Api();
    let select = document.createElement('SELECT');
    let response = api.getProducts('all');
    select.classList.add('form-control');
    response.done(function(data,status){
        let products = data['data']['products'];
        let option1 = document.createElement('OPTION');
        option1.innerHTML = 'انتخاب کنید';
        select.appendChild(option1);
        for(key in products)
        {
            var item = products[key];
            let option = document.createElement('OPTION');
            option.value = item.id;
            option.innerHTML = item.name;
            select.appendChild(option);
        }
        select.setAttribute('data-id',element.getAttribute('data-id'));
        $(`.select-productName`).remove();
        select.classList.add('select-productName');
        element.appendChild(select);
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR.status);
        console.log(textStatus);
        console.log(errorThrown);
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



