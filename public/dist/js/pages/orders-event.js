if(!ordersPageScript)
{
    ordersPageScript = true;
    $(document).on('click','.orders-filter',function(){
         document.getElementById('span-filter').innerHTML = this.innerHTML;
         getOrders($(this).attr('data-flag'));
    });

}
