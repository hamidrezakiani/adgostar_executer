<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Str;
class Account extends Authenticatable
{
    use HasFactory,SoftDeletes;

    protected $hidden = ['password','remember_token'];
    protected $gourd = ['accounts'];
    protected $appends = ['isAgent','isUser','isExecuter','isAdmin'];
    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function getIsAgentAttribute()
    {
        return $this->representation()->first();
    }

    public function getIsUserAttribute()
    {
        return $this->user->representation()->first();
    }

    public function getIsExecuterAttribute()
    {
        return $this->executer()->first();
    }

    public function getIsAdminAttribute()
    {
        return $this->admin()->first();
    }

    public function representation()
    {
        return $this->hasOne(Representation::class);
    }

    public function executer()
    {
        return $this->hasOne(Executer::class);
    }

    public function admin()
    {
        return $this->hasOne(Admin::class);
    }
}
