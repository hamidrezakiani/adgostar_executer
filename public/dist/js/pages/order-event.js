if(!ordersPageScript)
{
    ordersPageScript = true;
    $(document).on('click','.orders-filter',function(){
         document.getElementById('span-filter').innerHTML = this.innerHTML;
         getOrders($(this).attr('data-flag'));
    });


    $(document).on('click','#btn-new-times',function(){
         Notiflix.Confirm.Show(
            'تـــوجــــه',
            'آیا از رد این زمان ها مطمعنید؟',
            'بله',
            'خیر',
            function(){
               rejectAllTimes();
            },
            function(){

            }
        );
    });

     $(document).on('click','.highlight-day',function(){
         var id = $(this).attr('data-id');
         Notiflix.Confirm.Show(
            'تـــوجــــه',
            'آیا از انتخاب این زمان ها مطمعنید؟',
            'بله',
            'خیر',
            function(){
               chooseTime(id);
            },
            function(){

            }
        );
    });
}
