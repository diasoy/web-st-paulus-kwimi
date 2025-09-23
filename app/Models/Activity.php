<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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

    /**
     * Get the full URL for the image
     */
    public function getImageUrlAttribute($value)
    {
        if (!$value) {
            return null;
        }

        // Jika sudah berupa URL lengkap, return as is
        if (filter_var($value, FILTER_VALIDATE_URL)) {
            return $value;
        }

        // Return URL storage
        return Storage::url($value);
    }
}
