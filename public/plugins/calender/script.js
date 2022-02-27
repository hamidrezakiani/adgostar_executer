var targetDateTime;
var someWidth = 0;
var timeout;
function setTargetDateTime(year,month,day,weekDay){
    targetDateTime = dateObject(year, month, day, weekDay);
}

function setTodoList(list)
{
    toDo = list;
}

$(document).ready(function(){
    // setTargetDateTime(1400,8,3,2);
    // loadCalender();
    var startX, mouseDown = 0;
    $('#calender-table').mousedown(function () {
        mouseDown = 1;
    });

    $(document).mouseup(function () {
        mouseDown = 0;
    });

    $('#calender-table').mousemove(function (e) {
        if (startX && mouseDown) {
            if (startX > e.clientX) {
                var table = document.getElementById('calender-div');
                var colWidth = parseInt($('#days').children(2).css('width'));
                if ($('#days').children(':last').offset().left < -480) {
                    // test = 0;
                    table.scrollBy(colWidth * -1, 0);
                    prevCol();
                    setToDos();
                }
                table.scrollBy(startX - e.clientX, 0);
            }
            else if (startX < e.clientX) {
                var table = document.getElementById('calender-div');
                var colWidth = parseInt($('#days').children(2).css('width'));
                if ($('#days').children(':last').offset().left > -240) {
                    test = 0;
                    table.scrollBy(colWidth, 0);
                    nextCol();
                    setToDos();
                }
                if (test)
                    table.scrollBy(startX - e.clientX, 0);
            }

        }
        startX = e.clientX;
    });
});

window.addEventListener('load',function(){
   var touchSurface = document.getElementById('calender-table'),
   startX,
   startY,
   dist,
   threshold = 150,
   allowedTime = 200,
   elapseTime,
   startTime;

   touchSurface.addEventListener('touchstart',function(e){

     var touchobj = e.changedTouches[0];
     dist = 0;
     startX = touchobj.pageX;
     startY = touchobj.pageY;
     startTime = new Date().getTime();
     e.preventDefault();
   },false);

   touchSurface.addEventListener('touchmove',function(e){
       var touchobj = e.changedTouches[0];
       nowX = touchobj.pageX;
       nowY = touchobj.pageY;
       if(nowX < startX)
       {
           var table = document.getElementById('calender-div');
           var colWidth = parseInt($('#days').children(2).css('width'));
           if ($('#days').children(':last').offset().left < -480) {
               // test = 0;
               table.scrollBy(colWidth * -1, 0);
               prevCol();
               setToDos();
           }
           table.scrollBy(startX - nowX, 0);
       }
       else if(nowX > startX)
       {
               var table = document.getElementById('calender-div');
           var colWidth = parseInt($('#days').children(2).css('width'));
               if ($('#days').children(':last').offset().left > -240) {
                   test = 0;
                   table.scrollBy(colWidth, 0);
                   nextCol();
                   setToDos();
               }
               if (test)
                   table.scrollBy(startX - nowX, 0);
       }
       startX = nowX
       e.preventDefault();
   },false);

   touchSurface.addEventListener('touchend',function(e){
      var touchobj = e.changedTouches[0];
      dist = touchobj.pageX - startX;
      elapseTime = new Date().getTime() - startTime;
      var swipeRightBol = (dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100);
      handleSwipe(swipeRightBol);
   },false);

},false);

function orderToDo(){
  orderToDos = {};
  for(var key in toDo)
  {
      appendToOrderToDos(toDo[key]);
  }
}

function appendToOrderToDos(item){
    for (var key in orderToDos)
    {
        if (!checkInRow(item, orderToDos[key])) {
            orderToDos[key][Object.keys(orderToDos[key]).length] = item;
            return true;
        }
    }
    orderToDos[Object.keys(orderToDos).length] = {
       0:item
    };
    return false;
}

function checkInRow(item,row){
    for(var key in row)
    {
        if(check(item,row[key]))
           return true;
    }
    return false;
}

function check(toDo1,toDo2){
    var times1 = toDo1.times;
    var toDo1Start = times1[0].start,toDo1End = {
        'year': 1,
        'month': 1,
        'day': 1,
        'hour': 1
    };
    for(key in times1)
    {
        toDo1End = checkDates(toDo1End, times1[key].end) ? toDo1End : times1[key].end;
    }
    var times2 = toDo2.times;
    var toDo2Start = times2[0].start, toDo2End = {
        'year': 1,
        'month': 1,
        'day': 1,
        'hour': 1
    };
    for (key in times2) {
        toDo2End = checkDates(toDo2End, times2[key].end) ? toDo2End : times2[key].end;
    }
    return !(checkDates(toDo2Start, toDo1End) || checkDates(toDo1Start,toDo2End));
}

function checkDates(date1,date2){
   if(date1.year > date2.year)
   {
       return true;
   }
   else if(date1.year == date2.year)
   {
      if(date1.month > date2.month)
      {
          return true;
      }
      else if(date1.month == date2.month)
      {
         if(date1.day > date2.day)
         {
             return true;
         }
         else if(date1.day == date2.day)
         {
            if(date1.hour > date2.hour)
            {
                return true;
            }
            else
            {
                return false;
            }
         }
         else
         {
             return false;
         }
      }
      else
      {
          return false;
      }
   }
   else
   {
       return false;
   }
}

var test = 1;
$('#next').mousedown(function () {
    timeout = setInterval(function () {
        var table = document.getElementById('calender-div');
        var colWidth = parseInt($('#days').children(2).css('width'));
        if ($('#days').children(':last').offset().left > -240)
        {
            test = 0;
            table.scrollBy(colWidth, 0);
            nextCol();
            setToDos();
        }
        if(test)
        table.scrollBy(-3, 0);
    }, 0);

    return false;
});

function nextCol(){
    var weekDays = $('.week');
    for (let i = 0; i < weekDays.length - 1; i++) {
        const element = weekDays[i];
        var nextElement = weekDays[i + 1];
        element.innerHTML = nextElement.innerHTML;
    }
   var days = $('.day');
   for (let i = 0; i < days.length; i++) {
       const element = days[i];
       if(i+1 < days.length)
       {
         var nextElement = days[i+1];
         element.innerHTML = nextElement.innerHTML;
         element.color = nextElement.color
         element.style.color = nextElement.style.color;
         element.setAttribute('day',nextElement.getAttribute('day'));
         element.setAttribute('week-day',nextElement.getAttribute('week-day'));
         element.setAttribute('month',nextElement.getAttribute('month'));
         element.setAttribute('year',nextElement.getAttribute('year'));
         element.setAttribute('id', nextElement.getAttribute('id'));
       }
       else
       {
           var _nextDay = nextDay(dateObject(parseInt(element.getAttribute('year')), parseInt(element.getAttribute('month')), parseInt(element.getAttribute('day')), parseInt(element.getAttribute('week-day'))));
           element.innerHTML = _nextDay.day;
           var divMonth = document.createElement('DIV');
           divMonth.classList = 'div-month';
           divMonth.innerHTML = monthNames(_nextDay.month);
           element.appendChild(divMonth);
           var divYear = document.createElement('DIV');
           divYear.classList = 'div-year';
           divYear.innerHTML = _nextDay.year;
           element.appendChild(divYear);
           element.style.color = _nextDay.color;
           $('#weeks').children(':last').html(weekDayNames(_nextDay.weekDay));
           element.setAttribute('day', _nextDay.day);
           element.setAttribute('week-day', _nextDay.weekDay);
           element.setAttribute('month', _nextDay.month);
           element.setAttribute('year', _nextDay.year);
           element.setAttribute('id', `date-${_nextDay.year}-${_nextDay.month}-${_nextDay.day}`);
       }
   }
    test = 1;
}

function prevCol(){
    var weekDays = $('.week');
    for (let i = weekDays.length - 1; i > 0; i--) {
        const element = weekDays[i];
        var prevElement = weekDays[i - 1];
        element.innerHTML = prevElement.innerHTML;
    }
    var days = $('.day');
    for (let i = days.length - 1; i > 0; i--) {
        const element = days[i];
            var prevElement = days[i - 1];
            element.innerHTML = prevElement.innerHTML;
            element.style.color = prevElement.style.color;
            element.setAttribute('day', prevElement.getAttribute('day'));
            element.setAttribute('week-day', prevElement.getAttribute('week-day'));
            element.setAttribute('month', prevElement.getAttribute('month'));
            element.setAttribute('year', prevElement.getAttribute('year'));
            element.setAttribute('id', prevElement.getAttribute('id'));
    }
    const element = days[0];
    var _prevDay = prevDay(dateObject(parseInt(element.getAttribute('year')), parseInt(element.getAttribute('month')), parseInt(element.getAttribute('day')), parseInt(element.getAttribute('week-day'))));
    element.innerHTML = _prevDay.day;
    var divMonth = document.createElement('DIV');
    divMonth.classList = 'div-month';
    divMonth.innerHTML = monthNames(_prevDay.month);
    element.appendChild(divMonth);
    var divYear = document.createElement('DIV');
    divYear.classList = 'div-year';
    divYear.innerHTML = _prevDay.year;
    element.appendChild(divYear);
    element.style.color = _prevDay.color;
    $('#weeks').children(':first').html(weekDayNames(_prevDay.weekDay));
    element.setAttribute('day', _prevDay.day);
    element.setAttribute('week-day', _prevDay.weekDay);
    element.setAttribute('month', _prevDay.month);
    element.setAttribute('year', _prevDay.year);
    element.setAttribute('id', `date-${_prevDay.year}-${_prevDay.month}-${_prevDay.day}`);
    test = 1;
}

function prevDay(day){
    var date = dateObject(day.year,day.month,day.day,day.weekDay);
    if(date.day > 1)
    {
       date.day--;
    }
    else
    {
       if(date.month == 1)
       {
           date.month = 12;
           date.year--;
       }
       else
       {
           date.month--;
       }
        var dayOfMonth = getDayOfMonth(date.month,date.year);
        date.day=dayOfMonth;
    }
    date.weekDay = (date.weekDay + 6) % 7;
    var color = getWeekDayColor(date.weekDay);
    return {
        'year': date.year,
        'month': date.month,
        'day': date.day,
        'weekDay': date.weekDay,
        'color': color
    };
}

function monthNames(num){
    var month = {
        1: 'فروردین',
        2: 'اردیبهشت',
        3: 'خرداد',
        4: 'تیر',
        5: 'مرداد',
        6: 'شهریور',
        7: 'مهر',
        8: 'آبان',
        9: 'آذر',
        10: 'دی',
        11: 'بهمن',
        12: 'اسفند',
    };

    return month[num];
}

function weekDayNames(num){
    var week = {
        0: 'شنبه',
        1: 'یکشنبه',
        2: 'دوشنبه',
        3: 'سه‌شنبه',
        4: 'چهارشنبه',
        5: 'پنج‌شنبه',
        6: 'جمعه'
    };
    return week[num];
}

function nextMonth(date,months = 1){
    date.weekDay = (date.weekDay + getDayOfMonth(date.month,date.year)) % 7;
    if(date.month < 12){
       date.month++;
    }
    else{
       date.month = 1;
       date.year++;
    }
    var dayOfMonth = getDayOfMonth(date.month,date.year);
    date.day = (date.day > dayOfMonth) ? dayOfMonth : date.day;

    if(months != 1)
      return nextMonth(date,--months)
    return date;
}

function prevMonth(date,months = 1){
    if(date.month > 1){
       date.month--;
    }
    else{
       date.month = 12;
       date.year--;
    }
    var dayOfMonth = getDayOfMonth(date.month,date.year);
    date.day = (date.day > dayOfMonth) ? dayOfMonth : date.day;
    date.weekDay = (date.weekDay - getDayOfMonth(date.month,date.year) + 35) % 7;
    if(months != 1)
      return prevMonth(date,--months)
    return date;
}

function nextDay(date,days = 1){
    var dayOfMonth = getDayOfMonth(date.month,date.year);
    if(date.day == dayOfMonth)
    {
        date.day = 1;
        if (date.month == 12)
        {
            date.month = 1;
            date.year++;
        }
        else
        {
            date.month++;
        }
    }
    else
    {
        date.day++;
    }
    date.weekDay = ++date.weekDay % 7;
    var color = getWeekDayColor(date.weekDay);
    var nextDay = {
        'year':date.year,
        'month':date.month,
        'day':date.day,
        'weekDay':date.weekDay,
        'color':color
    };
    if(days != 1)
      return this.nextDay(nextDay,--days);
    return nextDay;
}

function getDayOfMonth(month,year){
    if (month <= 6)
        return 31;
    if (month == 12 & year % 4 != 3)
        return 29;

    return 30;
}

function getWeekDayColor(weekDay){
    if (weekDay == 6)
        return 'red';
    else
        return 'black';
}

function dateObject(year,month,day,weekDay)
{
    return {
        'year': year,
        'month': month,
        'day': day,
        'weekDay': weekDay
    };
}

function loadCalender(){
    var currentDate = prevDay(prevDay(prevDay(prevDay(targetDateTime))));
    orderToDo();
    $('#days').html('');
    $('#weeks').html('');
    for(;;)
    {
        if($('#days').children(':last').offset() && $('#days').children(':last').offset().left < -700)
           break;
            currentDate = nextDay(currentDate);
            var th = document.createElement('TH');
            th.setAttribute('month', currentDate.month);
            th.innerHTML = week[currentDate.weekDay];
            th.classList = 'week';
            document.getElementById('weeks').appendChild(th);
            var td = document.createElement('TD');
            td.setAttribute('id', `date-${currentDate.year}-${currentDate.month}-${currentDate.day}`);
            td.setAttribute('year', currentDate.year);
            td.setAttribute('month', currentDate.month);
            td.setAttribute('day', currentDate.day);
            td.setAttribute('week-day', currentDate.weekDay);
            td.classList = 'day';
            td.style.color = currentDate.color;
            var divMonth = document.createElement('DIV');
            divMonth.classList = 'div-month';
            divMonth.innerHTML = month[currentDate.month];
            td.appendChild(divMonth);
            var divYear = document.createElement('DIV');
            divYear.classList = 'div-year';
            divYear.innerHTML = currentDate.year;
            td.appendChild(divYear);
            td.innerHTML += currentDate.day;
            document.getElementById('days').appendChild(td);
    }
    setHolidays();
    var table = document.getElementById('calender-div');
    $('#tasks').css('width',table.scrollWidth);
    document.getElementById('calender-div').scrollBy(-200,0);
    setToDos();
}

function setHolidays(){
    for (key in holidays) {
        var day = holidays[key];
        $(`#date-${1400}-${day.month}-${day.day}`).addClass('holiday');
    }
}

function setToDos()
{
    $('.tasks').remove();
    for(key in orderToDos)
    {
        var rowId = key;
        $(`#taskbar${rowId}`).attr('someWidth',0);
        var toDoRow = orderToDos[key];
        for(key2 in toDoRow)
        {

            var task = toDoRow[key2];
            var times = task.times;
            var toDoStart = times[0].start, toDoEnd = {
                'year': 1,
                'month': 1,
                'day': 1,
                'hour': 1
            };
            for (key in times) {
                toDoEnd = checkDates(toDoEnd, times[key].end) ? toDoEnd : times[key].end;
            }

            var position = getPosition(toDoStart,toDoEnd);
            if (position)
             drawShape(task.id, position.startPoint, position.endPoint,task.name,rowId,task.status);

            if(Object.keys(task.times).length > 1)
              drawSubShape(task);

        }
    }
}

function getPosition(toDoStart,toDoEnd){
    var colWidth = parseInt($('#days').children(2).css('width'));
    var hourWidth = colWidth / 24;
    var startPoint =null , endPoint = null;
    var firstDay = $('#days').children(':first');
    var lastDay = $('#days').children(':last');
    var startElement = $(`#date-${toDoStart.year}-${toDoStart.month}-${toDoStart.day}`);
    var endElement = $(`#date-${toDoEnd.year}-${toDoEnd.month}-${toDoEnd.day}`);
    if (startElement.offset()) {
        startPoint = startElement.offset().left + parseInt(firstDay.css('width')) - hourWidth * toDoStart.hour;
        if (endElement.offset())
            endPoint = endElement.offset().left + parseInt(firstDay.css('width')) - hourWidth * toDoEnd.hour;
        else
            endPoint = lastDay.offset().left + parseInt(firstDay.css('width'));
    }
    else if (endElement.offset()) {
        endPoint = endElement.offset().left + parseInt(firstDay.css('width')) - hourWidth * toDoEnd.hour;
        startPoint = firstDay.offset().left + parseInt(firstDay.css('width'));
    }
    else if(checkDates(toDoEnd,dateObject(parseInt(lastDay.attr('year')),parseInt(lastDay.attr('month')),parseInt(lastDay.attr('day')),0)) && checkDates(dateObject(parseInt(firstDay.attr('year')),parseInt(firstDay.attr('month')),parseInt(firstDay.attr('day')),0),toDoStart)){
        startPoint = firstDay.offset().left + parseInt(firstDay.css('width'));
        endPoint = lastDay.offset().left + parseInt(firstDay.css('width'));
    }
    if (startPoint && endPoint)
      return {'startPoint' : startPoint,'endPoint':endPoint};
    else
      return false;
}

function drawSubShape(task){
    var taskTimes = task.times;
    for(key in taskTimes)
    {
        var time = taskTimes[key];
        var posision = getPosition(time.start,time.end);
        if(posision && posision.startPoint > -200)
        {
            var div = document.createElement('DIV');
            div.setAttribute('id', `to-do-${task.id}-time-${key}`);
            div.style.width = `${posision.startPoint - posision.endPoint}px`;
            if(task.status == 'TIME_REJECTED')
            div.innerHTML = `زمان ${parseInt(key) + 1} رد شد`;
            if(task.status == 'TIME_SUGGEST')
            div.innerHTML = `زمان پیشنهادی ${parseInt(key) + 1}`;
            div.style.left = `${posision.endPoint - $(`#to-do-${task.id}`).offset().left}px`;
            div.style.bottom = 'auto';
            div.classList = `task-times`;
            document.getElementById(`to-do-${task.id}`).appendChild(div);
            $(`#to-do-${task.id}`).attr('someWidth', parseInt($(`#to-do-${task.id}`).attr('someWidth')) + (posision.startPoint - posision.endPoint));
        }
    }
}

function drawShape(id,start,end,title,rowId,status)
{
    var div = document.createElement('DIV');
    div.setAttribute('id',`to-do-${id}`);
    div.setAttribute('someWidth',0);
    div.style.width = `${start - end}px`;
    div.style.left = `${end - $(`#taskbar${rowId}`).offset().left - parseInt($(`#taskbar${rowId}`).attr('someWidth'))}px`;
    div.style.bottom = 'auto';
    div.classList = `tasks ${status}`;
    var span = document.createElement('SPAN');
    span.innerHTML = title;
    span.setAttribute('id',`title-to-do-${id}`);
    span.setAttribute('data-id',id);
    span.classList = 'task-title';
    div.appendChild(span);
    document.getElementById(`taskbar${rowId}`).appendChild(div);
    $(`#taskbar${rowId}`).attr('someWidth', parseInt($(`#taskbar${rowId}`).attr('someWidth')) + (start - end));
}

$(document).mouseup(function () {
    clearInterval(timeout);
    return false;
});

$('#prev').mousedown(function () {
    timeout = setInterval(function () {
        var table = document.getElementById('calender-div');
        var colWidth = parseInt($('#days').children(2).css('width'));
        if ($('#days').children(':last').offset().left < -480) {
            // test = 0;
            table.scrollBy(colWidth * -1, 0);
            prevCol();
            setToDos();
        }
        table.scrollBy(3, 0);
    }, 0);

    return false;
});

function goTo(year,month,day)
{

}

if(!calenderPageScript)
{
    calenderPageScript = true;
    $(document).on('click','#next-month',function(){
    var _nextMonth = nextMonth(targetDateTime);
    console.log(targetDateTime,_nextMonth);
    setTargetDateTime(_nextMonth.year,_nextMonth.month,_nextMonth.day,_nextMonth.weekDay);
    loadCalender();

});
$(document).on('click','#prev-month',function(){
    var _prevMonth = prevMonth(targetDateTime);
    console.log(targetDateTime,_prevMonth);
    setTargetDateTime(_prevMonth.year,_prevMonth.month,_prevMonth.day,_prevMonth.weekDay);
    loadCalender();
});
}
//data!!!!!!!!!!!

var toDo = {
    0: {
        'id': 1,
        'status': 'NEW',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 4,
                    'day': 27,
                    'hour': 4
                },
                'end': {
                    'year': 1400,
                    'month': 5,
                    'day': 7,
                    'hour': 15
                }
            }
        }
    },
    1: {
        'id': 2,
        'status': 'TODO',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 5,
                    'day': 14,
                    'hour': 11
                },
                'end': {
                    'year': 1400,
                    'month': 5,
                    'day': 22,
                    'hour': 4
                }
            }
        }
    },
    2: {
        'id': 3,
        'STATUS': 'DOING',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 5,
                    'day': 26,
                    'hour': 1
                },
                'end': {
                    'year': 1400,
                    'month': 6,
                    'day': 3,
                    'hour': 22
                }
            }
        }
    },
    3: {
        'id': 4,
        'status': 'DONE',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 6,
                    'day': 15,
                    'hour': 10
                },
                'end': {
                    'year': 1400,
                    'month': 6,
                    'day': 16,
                    'hour': 18
                }
            }
        }
    },
    4: {
        'id': 5,
        'status': 'CLOSED',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 6,
                    'day': 24,
                    'hour': 5
                },
                'end': {
                    'year': 1400,
                    'month': 6,
                    'day': 27,
                    'hour': 12
                }
            }
        }
    },
    5: {
        'id': 6,
        'status': 'TIME_SUGGEST',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 7,
                    'day': 12,
                    'hour': 4
                },
                'end': {
                    'year': 1400,
                    'month': 7,
                    'day': 13,
                    'hour': 12
                }
            },
            1: {
                'start': {
                    'year': 1400,
                    'month': 7,
                    'day': 14,
                    'hour': 4
                },
                'end': {
                    'year': 1400,
                    'month': 7,
                    'day': 15,
                    'hour': 12
                }
            },

        }
    },
    6: {
        'id': 7,
        'status': 'CANCELED',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 7,
                    'day': 17,
                    'hour': 20
                },
                'end': {
                    'year': 1400,
                    'month': 7,
                    'day': 26,
                    'hour': 4
                }
            }
        }
    },
    7: {
        'id': 8,
        'status': 'TIME_REJECTED',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 7,
                    'day': 19,
                    'hour': 18
                },
                'end': {
                    'year': 1400,
                    'month': 7,
                    'day': 22,
                    'hour': 13
                }
            },
            1: {
                'start': {
                    'year': 1400,
                    'month': 7,
                    'day': 21,
                    'hour': 18
                },
                'end': {
                    'year': 1400,
                    'month': 7,
                    'day': 24,
                    'hour': 13
                }
            },
            2: {
                'start': {
                    'year': 1400,
                    'month': 7,
                    'day': 24,
                    'hour': 18
                },
                'end': {
                    'year': 1400,
                    'month': 7,
                    'day': 26,
                    'hour': 13
                }
            }
        },
    },
    8: {
        'id': 9,
        'status': 'TODO',
        'times': {
            0: {
                'start': {
                    'year': 1400,
                    'month': 7,
                    'day': 25,
                    'hour': 14
                },
                'end': {
                    'year': 1400,
                    'month': 8,
                    'day': 10,
                    'hour': 8
                }
            }
        }
    },
}

var holidays = {
    0: {
        'month': 11,
        'day': 22,
    },
    1: {
        'month': 9,
        'day': 3,
    }
}

var month = {
    1: 'فروردین',
    2: 'اردیبهشت',
    3: 'خرداد',
    4: 'تیر',
    5: 'مرداد',
    6: 'شهریور',
    7: 'مهر',
    8: 'آبان',
    9: 'آذر',
    10: 'دی',
    11: 'بهمن',
    12: 'اسفند',
};

var week = {
    0: 'شنبه',
    1: 'یکشنبه',
    2: 'دوشنبه',
    3: 'سه‌شنبه',
    4: 'چهارشنبه',
    5: 'پنج‌شنبه',
    6: 'جمعه'
};
var orderToDos = {};


