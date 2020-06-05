<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $table = "colors";

    protected $fillable = [
        'hexcode',
        'palette_id'
    ];


    // Eloquent Relations
    public function pal()
    {
        return $this->belongsTo( \App\Model\Palette::class, 'palette_id');
    }
}
