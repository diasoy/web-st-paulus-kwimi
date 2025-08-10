<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image_url',
        'location',
        'time_start',
        'date',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'time_start' => 'datetime:H:i:s',
            'date' => 'date',
        ];
    }
}
