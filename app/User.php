<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = "users";

    protected $fillable = [
        'name', 'email', 'password', 'username'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    // Eloquent Relationships

    // current user's profile
    public function profile()
    {
        return $this->hasOne(\App\Model\Profile::class);
    }

    // get current user's photo
    public function photo()
    {
        return $this->hasOne(\App\Model\Profile::class)
            ->first()->photo;
    }

    // get current user's all palettes
    public function pals()
    {
        return $this->hasMany(\App\Model\Palette::class);
    }

}
