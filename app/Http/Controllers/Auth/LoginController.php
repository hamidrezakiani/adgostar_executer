<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Auth\LoginService;
use Illuminate\Http\Request;

class LoginController extends Controller
{

    private $loginService;

    public function __construct(LoginService $loginService)
    {
        $this->loginService = $loginService;
    }

    public function loginPage()
    {
        return $this->loginService->loginPage();
    }

    public function login(Request $request)
    {
        return $this->loginService->login($request);
    }
}
