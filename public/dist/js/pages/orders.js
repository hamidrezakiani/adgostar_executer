getOrders(flag);
function getOrders(flag)
{
    let api = new Api();
    let response = api.getOrders(flag);
    response.done(function(data,status){
        var orders = data['data'];
         document.getElementById('table-orders').innerHTML = '';
        for(key in orders)
        {
            var order = orders[key];
            var tr = document.createElement('TR');
            var td = document.createElement('TD');
            td.innerHTML = order['id'];
            tr.appendChild(td);
            td = document.createElement('TD');
            var small = document.createElement('small');
            small.innerHTML = `${order['name']}`;
            td.appendChild(small);
            tr.appendChild(td);
            td = document.createElement('TD');
            small = document.createElement('SMALL');
            small.innerHTML = order['count'];
            td.appendChild(small);
            tr.appendChild(td);
            td = document.createElement('TD');
            small = document.createElement('SMALL');
            small.innerHTML = formatter.format(order['amount']);
            td.appendChild(small);
            tr.appendChild(td);
            td = document.createElement('TD');
            small = document.createElement('SMALL');
            small.className = 'badge pt-1 pb-1 pr-2 pl-2';
            switch (order['status'])
            {
                case 'COMPLETE':
                    small.classList.add('badge-info');
                    small.innerHTML = 'پابان یافته';
                    break;
                case 'DOING':
                    small.classList.add('badge-success');
                    small.innerHTML = 'در حال انجام';
                    break;
                case 'NOT_STARTED':
                    small.classList.add('badge-primary');
                    small.innerHTML = 'شروع نشده';
                    break;
                case 'NEW':
                    small.classList.add('badge-warning');
                    small.innerHTML = 'جدید';
                    break;
                case 'WAITING_REPRESENTATION':
                    small.classList.add('badge-warning');
                    small.innerHTML = 'در انتظار تایید ادمین';
                    break;
                case 'NOT_PAYED':
                    small.classList.add('badge-danger');
                    small.innerHTML = 'پرداخت نشده';
                    break;
                case 'SECONDARY_CANCELLATION':
                    small.classList.add('badge-danger');
                    small.innerHTML = 'لغو شده';
                    break;
                default:
                    break;
            }
            td.appendChild(small);
            tr.appendChild(td);
            td = document.createElement('TD');
            var button = document.createElement('BUTTON');
            button.className = 'page-links btn btn-success pt-0 pb-0 pr-1 pl-1';
            button.setAttribute('data-url',`/order?order_id=${order['id']}`);
            button.innerHTML = 'جزییات';
            td.appendChild(button);
            tr.appendChild(td);
            document.getElementById('table-orders').appendChild(tr);
        }
    });
    response.fail(function(jqXHR, textStatus, errorThrown){
        Notiflix.Notify.Failure('حطا در ارتباط', {cssAnimationStyle:'zoom', cssAnimationDuration:500,});
    });
}

