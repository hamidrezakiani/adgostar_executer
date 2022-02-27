<?php

use App\Http\Controllers\Auth\LoginController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/',function(){
  return redirect('/page/dashboard');
});
Route::get('/login',[LoginController::class,'loginPage'])->name('login');
Route::post('/login',[LoginController::class,'login']);
Route::group(['middleware' => ['auth:executer']], function () {
    Route::get('page/{url}',function(Request $request,$url){
      if($request->all())
      {
          $url.='?';
          foreach($request->all() as $key=>$value)
          {
              $url.=$key.'='.$value.'&';
          }
          $url = substr($url,0,strlen($url)-1);
      }
      return view('layout.master',compact('url'));
    });
    Route::get('page/dashboard',function(){
       return view('dashboard');
    });
   Route::get('services', function (Request $request) {
        if ($request->product_id) {
            $flag = 'productItems';
            $product_id = $request->product_id;
        } else {
            $product_id = NULL;
            $flag = 'all';
        }
        return view('items', compact(['product_id','flag']));
    });

    Route::get('services-create', function (Request $request) {
        return view('services-create');
    });

});

Route::get('/orders', function (Request $request) {
    $flag = $request->flag;
    return view('orders', compact(['flag']));
});

Route::get('/order', function (Request $request) {
    $order_id = $request->order_id;
    return view('order', compact(['order_id']));
});

Route::get('/calender', function (Request $request) {
    return view('calender');
});

