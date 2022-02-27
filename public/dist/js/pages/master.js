$(document).ready(function(){
        window.addEventListener('popstate',function(event)
        {
            Notiflix.Loading.Pulse('لطفا صبر کنید...');
            let currentUrl = window.location.href;
            let url = currentUrl.replace('/page','');
            $.get(url, function(data, status){
                $('#content').html(data);
                $('#NotiflixLoadingWrap').remove();
            });
        });

        $('#page-title').html('پنل مجری ادگستر');
        $('#favicon').attr('href',`${apiUrl}/media/images/representation/logo/adgostar.jpg`);
        $('#sidebar-logo').attr('src',`${apiUrl}/media/images/representation/logo/adgostar.jpg`);


        let api = new Api();
        let response = api.getAccount();
        response.done(function(data,status){
            $('#NotiflixLoadingWrap').remove();
            $('#user-name').html(`${data['data']['fullName']}`);
            $('#avatar').attr('src',data['data']['avatar']);
            if(data['data'].isAdmin != false)
            {
              $('.isAdmin').css('display','block');
              $('.isAdmin').attr('href',data['data'].isAdmin);
            }
            if(data['data'].isAgent != false)
            {
                $('.isAgent').css('display','block');
                $('.isAgent').attr('href',data['data'].isAgent);
            }
            if(data['data'].isUser != false)
            {
                $('.isUser').css('display','block');
                $('.isUser').attr('href',data['data'].isUser);
            }
            if(data['data'].executer != false)
            {
                $('.isExecuter').css('display','block');
                $('.isExecuter').attr('href',data['data'].isExecuter);
            }
        });
        response.fail(function(jqXHR, textStatus, errorThrown){
            $('#NotiflixLoadingWrap').remove();
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });

        $.get(pageUrl, function(data, status){
            $('#content').html(data);
        });

        $(document).on('click','.page-links',function()
        {
            Notiflix.Loading.Pulse('لطفا صبر کنید...');
            let currentUrl = baseUrl+'/page'+$(this).attr('data-url');
            window.history.pushState({},"", currentUrl);
            let url = baseUrl+$(this).attr('data-url');
            $.get(url, function(data, status){
                $('#content').html(data);
                $('#NotiflixLoadingWrap').remove();
            });
        })
});

var formatter = new Intl.NumberFormat('fa-IR', {
    currency: 'IRR',
});

