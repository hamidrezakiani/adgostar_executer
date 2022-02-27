if(!calenderPageScript2){
    calenderPageScript2 = true;
    $(window).on('click',function(e){
        var id = e.target.getAttribute('data-id');
        if(e.target.className == 'task-title')
        {
            var order = {};
            for(key in orderToDos)
            {
                var row = orderToDos[key];
                for(key2 in row)
                {
                   if(row[key2].id == id)
                      order = row[key2];
                }
            }
            console.log(order);
            document.getElementById('product-name').innerHTML = order.name;
            document.getElementById('status').classList = order.status;
            document.getElementById('order-count').innerHTML = order.count;
            if(!(order.status == 'TIME_REJECTED' || order.status == 'TIME_SUGGEST'))
            {
                var start = order.times[0].start;
                var end = order.times[0].end;
                document.getElementById('start-time').innerHTML = `${start.hour}:00  ${start.year}/${start.month}/${start.day}`;
                document.getElementById('end-time').innerHTML = `${end.hour}:00  ${end.year}/${end.month}/${end.day}`;
            }
            var detailBox = document.getElementById('detail-box');
            detailBox.style.display = 'flex';
            detailBox.style.top = e.pageY;
            detailBox.style.left = e.pageX;
        }
        else
        {
            var detailBox = document.getElementById('detail-box');
            detailBox.style.display = 'none';
        }
    });
}
