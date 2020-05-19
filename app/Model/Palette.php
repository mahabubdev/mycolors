<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Palette extends Model
{
    protected $table = "palettes";

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description'
    ];

    // Eloquent Relations

    // author user
    public function author()
    {
        return $this->belongsTo(\App\User::class);
    }

    public function colors()
    {
        return $this->hasMany(\App\Model\Color::class);
    }
}
