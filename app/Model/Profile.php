<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $table = "profiles";

    protected $fillable = [
        'user_id',
        'gender',
        'photo',
        'address',
        'dob',
        'github',
        'website',
        'facebook',
        'instagram'
    ];

    // relation with user
    public function user()
    {
        return $this->belongsTo(\App\Model\Profile::class);
    }



}
