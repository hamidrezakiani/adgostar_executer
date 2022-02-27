<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="bootstrap.min.css">


</head>
<body style="direction: rtl;">
        <div id="detail-box" class="row">
         <div>
            سرویس : <span id="product-name">فالور پاپ آپ از هزاز کا تا دو هزار ک یشی  شی یشیییش سیش صا</span>
         </div>
         <div>
            وضعیت : <span id="status" class="NEW">جدید</span>
         </div>
         <div>
            تعداد : <span id="order-count"></span>
         </div>
         <div>
             زمان شروع : <span id="start-time">1400/2/8 22:00</span>
         </div>
         <div>
             زمان پایان : <span id="end-time">1400/2/10 22:00</span>
         </div>
         <div>
             <span id="more" class="btn btn-primary">جزییات بیشتر</span>
         </div>
        </div>
        <div class="col-lg-12" style="padding: 0;">
        <div class="row" style="padding: 0">
            <div class="col-4">
                 <span class="fa fa-arrow-circle-right" id="prev-month"> ماه قبل </span>
            </div>
            <div class="col-4"></div>
            <div class="col-4">
                   <span class="fa fa-arrow-circle-left" id="next-month"> ماه بعد </span>
            </div>
        </div>
        <div class="col-lg-12" style="padding: 0;" id="calender-div">
                    <button id="prev"><</button>
                    <button id="next">></button>
                    <table id="calender-table" class="table table-bordered" style="direction: rtl;">
                        <thead id="table-thead">
                            <tr id="weeks">

                            </tr>
                        </thead>
                        <tbody>
                            <tr id="days">

                            </tr>
                            <tr class="taskbar">
                              <td id="taskbar0" someWidth="0" colspan="1000"></td>
                            </tr>
                            <tr class="taskbar">
                                <td id="taskbar1" someWidth="0" colspan="1000"></td>
                            </tr>
                            <tr class="taskbar">
                                <td id="taskbar2" someWidth="0" colspan="1000"></td>
                            </tr>
                            <tr class="taskbar">
                                <td id="taskbar3" someWidth="0" colspan="1000"></td>
                            </tr>
                            <tr class="taskbar">
                                <td id="taskbar4" someWidth="0" colspan="1000"></td>
                            </tr>
                            <tr id="calender-lines">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                 </div>
        </div>
    <script src="{{asset('plugins/calender/script.js')}}"></script>
    <script src="{{asset('dist/js/pages/calender.js')}}"></script>
    <script src="{{asset('dist/js/pages/calender-event.js')}}"></script>
</body>
</html>
