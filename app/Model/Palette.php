<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Palette extends Model
{
    //protected $table = "palettes";

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description'
    ];

    // Eloquent Relations
    public function colors()
    {
        return $this->hasMany( \App\Model\Color::class);
    }

    // author user
    public function author()
    {
        return $this->belongsTo(\App\User::class, 'user_id');
    }
}
