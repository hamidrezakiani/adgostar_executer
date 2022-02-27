if(!servicesCreatePageScript){

        servicesCreatePageScript = true;
        $(document).on('click','.has-sub-cat.caret',function(){
        //    this.parentElement.querySelector(".tree-nested").classList.toggle("active");
           this.classList.remove("fa-plus-square");
           this.classList.add('fa-spinner');
           this.classList.add('fa-spin');
           setCategories('subCats',$(this).attr('data-id'),this.parentElement);
        });

         $(document).on('click','.has-product.caret',function(){
        //    this.parentElement.querySelector(".tree-nested").classList.toggle("active");
           this.classList.remove("fa-plus-square");
           this.classList.add('fa-spinner');
           this.classList.add('fa-spin');
           setProducts('categoryProducts',$(this).attr('data-id'),this.parentElement);
        });

        $(document).on('click','.product-no-participated',function(){
           productId = $(this).attr('data-productId');
           document.getElementById('selected-product').innerHTML = $(this).attr('data-name');
           document.getElementById('selected-product').className = 'text-success';
           var top = document.getElementById('add-service-card').offsetTop;
           var x = window.matchMedia("(max-width: 767px)");
           if (x.matches)
            window.scrollTo(0, top);
           document.getElementById('participation-periods').innerHTML = '';
           document.getElementById('create-participation-submit').style.display = 'block';
           document.getElementById('edit-participation-submit').style.display = 'none';
           document.getElementById('refresh-item-periods').style.display = 'none';
           setFirstPeriodInput();
        });

        $(document).on('click','.product-participated',function(){
           participationId = $(this).attr('data-participationId');
           document.getElementById('selected-product').innerHTML = $(this).attr('data-name');
           document.getElementById('selected-product').className = 'text-success';
           var top = document.getElementById('add-service-card').offsetTop;
           var x = window.matchMedia("(max-width: 767px)");
           if (x.matches)
            window.scrollTo(0, top);
           document.getElementById('participation-periods').innerHTML = '';
           document.getElementById('edit-participation-submit').style.display = 'block';
           document.getElementById('create-participation-submit').style.display = 'none';
           document.getElementById('refresh-item-periods').style.display = 'inline';
           setParticipationPeriods();
        });

        $(document).on('click','.caret-down',function(){
           this.parentElement.querySelector('ul').remove();
           this.classList.add("fa-plus-square");
           this.classList.remove('fa-minus-square');
           this.classList.add('caret');
           this.classList.remove('caret-down');
        });

        $(document).on('click','#add-new-period',function(){
           var countRow = $(this).attr('data-countRow');
          lastPeriodFrom = $(`.period-from[data-countRow = ${countRow-1}]`);
          lastPeriodTo = $(`.period-to[data-countRow = ${countRow-1}]`);
          if(!Number.parseInt(lastPeriodTo.val()) || Number.parseInt(lastPeriodTo.val()) <= Number.parseInt(lastPeriodFrom.val()))
          {
              Notiflix.Report.Failure("خطا","پایان بازه باید بزرگتر از شروع بازه باشد.","باشه");
          }
          else
          {
             if(countRow > 1)
              document.getElementById('remove-last-period').parentElement.remove();
              lastPeriodTo.attr('disabled',true);
              addNewPeriodInput(countRow,Number.parseInt(lastPeriodTo.val())+1);
          }
        });

        $(document).on('click','#create-participation-submit',function(){
            var countPeriod = $('.period-cost').length;
            storeParticipation(countPeriod);
        });

        $(document).on('click','#edit-participation-submit',function(){
            var countPeriod = $('.period-cost').length;
            editParticipationPeriods(countPeriod);
        });

        $(document).on('click','#refresh-item-periods',function(){
           setParticipationPeriods($(this).attr('data-id'));
        });

        $(document).on('click','#remove-last-period',function(){
          var countRow = $(this).attr('data-countRow');
          var prevPeriodFrom = $(`.period-from[data-countRow=${countRow-1}]`).val();
          var prevPeriodTo = $(`.period-to[data-countRow=${countRow-1}]`).val();
          var prevPeriodCost = $(`.period-cost[data-countRow=${countRow-1}]`).val();
          $(`.period-from[data-countRow=${countRow}]`).val(prevPeriodFrom);
          $(`.period-to[data-countRow=${countRow}]`).val(prevPeriodTo);
          $(`.period-cost[data-countRow=${countRow}]`).val(prevPeriodCost);
          $(`.period-row[data-countRow=${countRow-1}]`).remove();
          $(`[data-countRow=${countRow}]`).attr('data-countRow',countRow -1);
          $('#add-new-period').attr('data-countRow',countRow);
          $('#save-period-changes').attr('data-countRow',countRow);
          if(countRow == 1)
          this.parentElement.remove();
        });

        $(document).on('click','#remove-all-periods',function(){
          $(`.period-row[data-countRow != 0]`).remove();
          $(`.period-to[data-countRow = 0]`).val('');
          $(`.period-to[data-countRow = 0]`).attr('disabled',false);
          $('#add-new-period').attr('data-countRow',1);
          $('#save-period-changes').attr('data-countRow',1);
        });
}
