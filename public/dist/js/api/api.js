class Api{
    getAccount()
    {
        var url = `${apiUrl}/api/executer`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getCategories(flag,parent_id = null)
    {
        var url = `${apiUrl}/executer/categories?flag=${flag}&parent_id=${parent_id}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getProducts(flag,category_id = null)
    {
        var url = `${apiUrl}/executer/products?flag=${flag}&category_id=${category_id}`;
        var data = {};
       return this.ajaxJson(url,'GET',data);
    }


    storeParticipation(data)
    {
       var url = `${apiUrl}/executer/participations`;
       return this.ajaxFormData(url,'POST',data);
    }

    updateParticipationPeriods(data,participation_id)
    {
       var url = `${apiUrl}/executer/participations/${participation_id}`;
       return this.ajaxFormData(url,'PUT',data);
    }

    getParticipationPeriods(participation_id)
    {
       var url = `${apiUrl}/executer/participations/${participation_id}/periods?flag=all`;
       var data = {};
       return this.ajaxJson(url,'GET',data);
    }

    getOrders(flag) {
        var url = `${apiUrl}/executer/orders?flag=${flag}`;
        var data = {};
        return this.ajaxJson(url, 'GET', data);
    }

    getOrder(order_id)
    {
        var url = `${apiUrl}/executer/orders/${order_id}`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getPersianTime()
    {
        var url = `${apiUrl}/persian-time`;
        var data = {};
        return this.ajaxJson(url,'GET',data);
    }

    getPage(url,data)
    {
        return this.ajaxJson(url,'GET',data);
    }

    ajaxJson(url,method,data)
    {
        return $.ajax({
            "url": url,
            "method": method,
            "data": data,
            "timeout": 0,
            "dataType":"json",
            "crossDomain" : true,
            "headers": {
                "Content-Type": "application/json",
                "X-Requested-With" : "XMLHttpRequest",
                "Authorization": `Bearer ${api_token}`
             },
        });
    }

    ajaxFormData(url,method,data)
    {
        return $.ajax({
            "url": url,
            "method": "POST",
            "_method":method,
            "type":"POST",
            "data": data,
            "timeout": 0,
            "processData": false,
            "contentType": false,
            "headers": {
                "X-HTTP-Method-Override": method,
                "Authorization": `Bearer ${api_token}`
             },
        });
    }
}
