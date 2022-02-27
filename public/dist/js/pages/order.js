var highlightTimes = {};
getOrder(orderId);
function getOrder(orderId)
{
    let api = new Api();
    let response = api.getOrder(orderId);
           response.done(function(data,status){
           var order = data['data'];
           document.getElementById('product-name').innerHTML = order['product_name'];
           document.getElementById('count-order').innerHTML = order['count'];
           document.getElementById('unit-price').innerHTML = formatter.format(order['unit_price']);
           document.getElementById('cost').innerHTML = formatter.format(order['amount']);
           document.getElementById('start-time').innerHTML = order['startTime'];
           document.getElementById('end-time').innerHTML = order['endTime'];
           var spanStatus = document.getElementById('status');
           switch (order['textStatus']) {
               case 'NOT_PAYED':
                   document.getElementById('start-time').innerHTML = 'تایید نشده';
                   document.getElementById('end-time').innerHTML = 'تایید نشده';
                   spanStatus.innerHTML = 'پرداخت نشده';
                   spanStatus.className = 'bg-danger';
                   break;
               case 'WAITING_REPRESENTATION':
                   document.getElementById('start-time').innerHTML = 'تایید نشده';
                   document.getElementById('end-time').innerHTML = 'تایید نشده';
                   spanStatus.innerHTML = 'در انتظار زماندهی ادمین';
                   spanStatus.className = 'bg-warning';
                   break;
               case 'WAITING_USER':
                   document.getElementById('start-time').innerHTML = 'تایید نشده';
                   document.getElementById('end-time').innerHTML = 'تایید نشده';
                   spanStatus.innerHTML = 'در انتظار انتخاب زمان';
                   spanStatus.className = 'bg-warning';
                   break;
               case 'NOT_STARTED':
                   spanStatus.innerHTML = 'شروع نشده';
                   spanStatus.className = 'bg-info';
                   break;
               case 'DOING':
                   spanStatus.innerHTML = 'در حال انجام';
                   spanStatus.className = 'bg-primary';
                   break;
               case 'COMPLETE':
                   spanStatus.innerHTML = 'اتمام سفارش';
                   spanStatus.className = 'bg-success';
                   break;
               case 'SECONDARY_CANCELLATION':
                   spanStatus.innerHTML = 'لغو شده';
                   spanStatus.className = 'bg-success';
                   break;
               default:
                   break;
           }
           var calenderDiv = document.getElementById('calender');
           var minTime = order.minTime;
           var dayOfWeek =(50 + minTime.dayOfWeek - minTime.day)%7;
           highlightTimes = order.newTimes;
           calender(calenderDiv,minTime.year,minTime.month,dayOfWeek,minTime.daysInMonth);

           if(order['textStatus'] == 'NOT_PAYED')
           {
              $('#timing-card').css('display','none');
              $('#btn-pay').css('display','inline');
           }
           else
           {
              $('#timing-card').css('display','block');
           }
           var properties = order.properties;
           var propertiesDiv = document.getElementById('properties-div');
           propertiesDiv.innerHTML = '';
           for(key in properties)
           {
               var property = properties[key];
               var div = document.createElement('DIV');
               div.className = 'col-xl-4 col-lg-4 col-md-12 col-sm-12 p-2';
               var span = document.createElement('SPAN');
               span.className = 'font-weight-bold';
               span.innerHTML = property.name + ' : ';
               div.appendChild(span);
               switch(property.dataType)
               {
                   case 'MOVIE' :

                    break;
                   case 'TEXT' :
                     var span = document.createElement('SPAN');
                     span.innerHTML = property.value;
                     div.appendChild(span);
                    break;
                   case 'PHOTO' :
                    var img = document.createElement('IMG');
                    img.src = 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png';
                    img.style.width = '100%';
                    img.className = 'order-property';
                    img.setAttribute('data-propertyId',property.id);
                    img.setAttribute('data-type','file');
                    div2.appendChild(img);
                   default :
                    break;
               }
               propertiesDiv.appendChild(div);
            }
            var times = order.allTimes;
            var timesDiv = document.getElementById('times');
            timesDiv.innerHTML = '';
            for(key in times)
            {
              var span = document.createElement('SPAN');
              span.style.display = 'block';
              var groupTimes = times[key];
              var sender = groupTimes[0].sender;
              var status = groupTimes[0].status;
              if(sender == 'USER')
                var textTimes = 'شما ';
              else
                var textTimes='ادمین ';
              for(key in groupTimes)
              {
                  if(key != 0)
                    textTimes += '،';
                  var time = groupTimes[key];
                  textTimes += time.persian;
              }
              switch (status) {
                  case 'PENDING':
                      if(sender == 'USER')
                      {
                        textTimes += 'را پیشنهاد دادید.';
                        span.className = 'text-warning';
                      }
                      else
                      {
                        textTimes += 'را پیشنهاد داد.';
                        span.className = 'text-primary';
                      }
                      break;
                  case 'REJECT':
                      if(sender == 'USER')
                      {
                        textTimes += 'را رد کردید.';
                        span.className = 'text-danger';
                      }
                      else
                      {
                        textTimes += 'را رد کرد.';
                        span.className = 'text-danger';
                      }
                      break;
                   case 'ACCEPT':
                       $(`td[data-day=${minTime.day}]`).addClass('bg-success');
                       if (sender == 'USER')
                        {
                           textTimes += 'را تایید کردید.';
                           span.className = 'text-success';
                        }
                        else
                        {
                           textTimes += 'را تایید کرد.';
                           span.classList = 'text-success';
                        }
                  default:
                      break;
              }
              span.innerHTML = textTimes;
              timesDiv.appendChild(span);
            }
            var lastGroup = times[times.length-1][0];
              if(lastGroup.sender == 'REPRESENTATION' && lastGroup.status == 'PENDING')
              {
                  var h5 = document.createElement('H5');
                  h5.innerHTML = 'لطفا یکی از زمان های پیشنهاد داده شده توسط ادمین را از روی تقویم انتخاب کنید در غیر این صورت درخواست زمان جدید بدهید!!';
                  timesDiv.appendChild(h5);
                  var button = document.createElement('BUTTON');
                  button.setAttribute('id','btn-new-times');
                  button.innerHTML = 'درخواست زمان جدید';
                  button.className = 'btn btn-success';
                  timesDiv.append(button);
              }
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function rejectAllTimes()
{
   Notiflix.Loading.Pulse('لطفا صبر کنید...');
   let api = new UserApi();
    let response = api.rejectOrderTimes(orderId);
           response.done(function(data,status){
               getOrder(orderId);
               $('#NotiflixLoadingWrap').remove();
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               $('#NotiflixLoadingWrap').remove();
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}

function chooseTime(timeId)
{
   Notiflix.Loading.Pulse('لطفا صبر کنید...');
   let api = new UserApi();
    let response = api.chooseOrderTime(orderId,timeId);
           response.done(function(data,status){
               getOrder(orderId);
               $('#NotiflixLoadingWrap').remove();
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               $('#NotiflixLoadingWrap').remove();
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
}
