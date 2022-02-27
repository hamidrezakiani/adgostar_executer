var divElement;
function calender(div,year,month,dayOfWeek,daysInMonth,holidays = {})
{
  divElement = div;
  div.innerHTML = '';
  const persianMonth = {1:'فروردین',2:'اردیبهشت',3:'خرداد',4:'تیر',5:'مرداد',6:'شهریور',7:'مهر',8:'آبان',9:'آذر',10:'دی',11:'بهمن',12:'اسفند'};
  ///// start header
  var headerDiv = document.createElement('DIV');
  headerDiv.className = 'row mb-1';
  var divArrowRight = document.createElement('DIV');
  divArrowRight.className = 'col-4 text-left';
  var spanArrowRight = document.createElement('SPAN');
  spanArrowRight.className = 'fa fa-arrow-right text-left cursor-pointer';
  spanArrowRight.setAttribute('id','arrow-right');
  spanArrowRight.setAttribute('data-year',year);
  spanArrowRight.setAttribute('data-month',month);
  divArrowRight.appendChild(spanArrowRight);
  headerDiv.appendChild(divArrowRight);
  var divMonth = document.createElement('DIV');
  divMonth.className = 'col-4 text-center';
  divMonth.innerHTML = persianMonth[month] + ' ' + year;
  headerDiv.appendChild(divMonth);
  var divArrowLeft = document.createElement('DIV');
  divArrowLeft.className = 'col-4 text-right';
  var spanArrowLeft = document.createElement('SPAN');
  spanArrowLeft.className = 'fa fa-arrow-left text-right cursor-pointer';
  spanArrowLeft.setAttribute('id','arrow-left');
  spanArrowLeft.setAttribute('data-year',year);
  spanArrowLeft.setAttribute('data-month',month);
  divArrowLeft.appendChild(spanArrowLeft);
  headerDiv.appendChild(divArrowLeft);
  div.appendChild(headerDiv);
  //////// end header
  //////// start body
  var divBody = document.createElement('DIV');
  divBody.className = 'row';
  var table = document.createElement('TABLE');
  table.className = 'table table-bordered';
  var thead = document.createElement('THEAD');
  thead.className = 'thead-light';
  var trHead = document.createElement('TR');
  var thSaturday = document.createElement('TH');
  thSaturday.innerHTML = 'شنبه';
  trHead.appendChild(thSaturday);
  var thSunday = document.createElement('TH');
  thSunday.innerHTML = 'یکشنبه';
  trHead.appendChild(thSunday);
  var thMonday = document.createElement('TH');
  thMonday.innerHTML = 'دوشنبه';
  trHead.appendChild(thMonday);
  var thTuesday = document.createElement('TH');
  thTuesday.innerHTML = 'سه شنبه';
  trHead.appendChild(thTuesday);
  var thWednesday = document.createElement('TH');
  thWednesday.innerHTML = 'چهارشنبه';
  trHead.appendChild(thWednesday);
  var thThursday = document.createElement('TH');
  thThursday.innerHTML = 'پنجشنبه';
  trHead.appendChild(thThursday);
  var thFriday = document.createElement('TH');
  thFriday.innerHTML = 'جمعه';
  trHead.appendChild(thFriday);
  thead.appendChild(trHead);
  table.appendChild(thead);
  var tbody = document.createElement('TBODY');
  var day = 1;
  for(var i=0;i<5;i++)
  {
    var trWeek = document.createElement('TR');
    for(var j=0;j<7;j++)
    {
        var tdDay = document.createElement('td');
        if(j%7==6)
        {
            tdDay.style.color = 'red';
            tdDay.style.fontWeight = 'bold';
        }
        tdDay.setAttribute('data-count',i*7+j);
        console.log(dayOfWeek);
        console.log(daysInMonth);
        if(i*7+j >= dayOfWeek && day <= daysInMonth)
        {
           var orderDiv = document.createElement('DIV');
           orderDiv.className = 'order-div';
           orderDiv.innerHTML = day;
           tdDay.appendChild(orderDiv);
           tdDay.setAttribute('data-day',day);
           day++;
        }
        trWeek.appendChild(tdDay);
    }
    tbody.appendChild(trWeek);
  }
  table.appendChild(tbody);
  divBody.appendChild(table);
  div.appendChild(divBody);
  if(day<daysInMonth)
  {
      for(var i=0;day<=daysInMonth;i++)
      {
          $(`td[data-count=${i}]`).attr('data-day',day);
          $(`td[data-count=${i}]`).html(day);
          day++;
      }
  }

  //////// End body
  //////// Highlight times
  for(key in highlightTimes)
  {
      var time = highlightTimes[key];
      if(time.year == year && time.month == month)
      {
          $(`td[data-day=${time.day}]`).addClass('border-animation');
          $(`td[data-day=${time.day}]`).addClass('highlight-day');
          $(`td[data-day=${time.day}]`).attr('data-id',time.id);
      }
      else if(time.year > year || (time.year == year && time.month > month))
      {
          $('#arrow-right').addClass('blink');
      }
  }
  //////// End highlight times
  ///// Holidays
  console.log(holidays);
  for(key in holidays)
  {
     $(`td[data-day=${holidays[key]}]`).css('color','red');
     $(`td[data-day=${holidays[key]}]`).css('font-weight','bold');
  }
  ///// End holidays
}
/////// End function

//////// Start events
$(document).on('click','#arrow-right',function(){
 var year = $(this).attr('data-year');
 var month = $(this).attr('data-month');
 var api = new Api();
 let response = api.persianNextMonthData(year,month);
 response.done(function(data,status){
           var monthData = data['data'];
             calender(divElement,monthData.year,monthData.month,monthData.dayOfWeek,monthData.daysInMonth,monthData.holidays);
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
});

$(document).on('click','#arrow-left',function(){
 var year = $(this).attr('data-year');
 var month = $(this).attr('data-month');
 var api = new Api();
 let response = api.persianPreviousMonthData(year,month);
 response.done(function(data,status){
           var monthData = data['data'];
             calender(divElement,monthData.year,monthData.month,monthData.dayOfWeek,monthData.daysInMonth,monthData.holidays);
           });
           response.fail(function(jqXHR, textStatus, errorThrown){
               Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
           });
});
//////// End events
