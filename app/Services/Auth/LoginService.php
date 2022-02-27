<?php
namespace App\Services\Auth;

use App\Repositories\Eloquent\Auth\LoginRepository;
use App\Lib\ResponseTemplate;
use App\Models\Executer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class LoginService extends ResponseTemplate{

    protected $loginRepository;

    public function __construct(LoginRepository $loginRepository)
    {
        $this->loginRepository = $loginRepository;
    }

    public function loginPage()
    {
        return view('Auth.login');
    }

    public function login(Request $request)
    {
        $executer = Executer::where('phone',$request->phone)->first();
        if($executer && Hash::check($request->password, $executer->password))
        {
           Auth::login($executer);
           Auth::guard('executer')->login($executer);
           return redirect('page/dashboard');
        }
        else
        {
           return redirect()->back();
        }
    }

}
