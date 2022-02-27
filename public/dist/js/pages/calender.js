var highlightTimes = {};
calender();
function calender()
{
    let api2 = new Api();
let response2 = api2.getPersianTime();
response2.done(function(data,status){
    var time = data['data'];
    console.log(time);
    setTargetDateTime(time.year,time.month,time.day,time.dayOfWeek);
    let response = api2.getOrders('ALL');
    response.done(function(data,status){
        var orders = data['data'];
        setTodoList(orders);
         loadCalender();
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
    });

});
response2.fail(function(jqXHR, textStatus, errorThrown){
     Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
});
}
