if(!itemPageScript)
    {
        itemPageScript = true;
        $(document).on('dblclick','.item-name',function(){
            if(!$(`.input-name[data-id=${$(this).attr('data-id')}]`).length)
            {

            var input = document.createElement('TEXTAREA');
            input.setAttribute('rows','2');
            input.setAttribute('cols','30');
            input.classList.add('input-item-name');
            input.classList.add('form-control');
            input.setAttribute('data-id',$(this).attr('data-id'));
            input.setAttribute('data-old',$(this).html());
            input.value = $(this).html();
            $(this).html('');
            this.appendChild(input);
            }
        });

        $(document).on('focusout','.input-item-name',function(){
            var formData = new FormData();
            formData.append('name',$(this).val());
            updateItem(formData,$(this).attr('data-id'));
            $(`.item-name[data-id=${$(this).attr('data-id')}]`).html($(this).attr('data-old'));
            $(this).remove();
        });

        $(document).on('dblclick','.item-productName',function(){
            setProductsSelectOptions(this);
        });

        $(document).on('change','.select-productName',function(){
                var formData = new FormData();
                formData.append('product_id',$(this).val());
                updateItem(formData,$(this).attr('data-id'));
                $(`.item-ProductName[data-id=${$(this).attr('data-id')}]`).html($(this).find(":selected").text());
        });

        $(document).on('change','.item-viewable',function(){
            var formData = new FormData();
            if(this.checked)
              formData.append('viewable','YES');
            else
              formData.append('viewable','NO');
            updateItem(formData,$(this).attr('data-id'));
        });
    }
