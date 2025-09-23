<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'content',
        'image_url',
        'is_publish',
        'user_id',
    ];

    protected $casts = [
        'is_publish' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Scope untuk hanya menampilkan pengumuman yang dipublish
    public function scopePublished($query)
    {
        return $query->where('is_publish', true);
    }

    // Accessor untuk mendapatkan excerpt dari content
    public function getExcerptAttribute(): string
    {
        return strlen($this->description) > 150 
            ? substr($this->description, 0, 150) . '...' 
            : $this->description;
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