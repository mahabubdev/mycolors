<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    //
    protected $table = "tokens";

    protected $fillable = ['user_id', 'verify_token'];

    // Realtion with User-Model
    public function user()
    {
        return $this->belongsTo( \App\User::class, 'user_id');
    }


}