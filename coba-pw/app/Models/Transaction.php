<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = ['items', 'total', 'payment', 'change'];

    protected $casts = [
        'items' => 'array',
    ];
    
}