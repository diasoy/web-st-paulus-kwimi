<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ChurchOfficial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'phone',
        'email',
        'address',
        'photo',
        'community_id',
        'department',
        'start_date',
        'end_date',
        'is_active',
        'notes',
    ];

    protected $appends = ['photo_url'];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'end_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the community that the official belongs to
     */
    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    /**
     * Get the position label in Indonesian
     */
    public function getPositionLabelAttribute(): string
    {
        $positions = [
            'pastor_paroki' => 'Pastor Paroki',
            'ketua_lingkungan' => 'Ketua Lingkungan',
            'sekretaris_lingkungan' => 'Sekretaris Lingkungan',
            'bendahara_lingkungan' => 'Bendahara Lingkungan',
            'koordinator_wilayah' => 'Koordinator Wilayah',
            'dewan_paroki' => 'Dewan Paroki',
            'ketua_sie' => 'Ketua Seksi',
            'anggota_sie' => 'Anggota Seksi',
        ];

        return $positions[$this->position] ?? $this->position;
    }

    /**
     * Get the full URL for the photo
     */
    public function getPhotoUrlAttribute()
    {
        if (!$this->photo) {
            return asset('images/default-avatar.png');
        }

        // Jika sudah berupa URL lengkap, return as is
        if (filter_var($this->photo, FILTER_VALIDATE_URL)) {
            return $this->photo;
        }

        // Jika path dimulai dengan church-officials/, gunakan storage URL
        if (str_starts_with($this->photo, 'church-officials/')) {
            return Storage::disk('public')->url($this->photo);
        }

        // Return URL storage
        return Storage::url($this->photo);
    }

    /**
     * Scope to get only active officials
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to get officials by position
     */
    public function scopeByPosition($query, string $position)
    {
        return $query->where('position', $position);
    }

    /**
     * Check if official is currently serving (within tenure period)
     */
    public function isCurrentlyServing(): bool
    {
        $now = now()->toDateString();
        
        if (!$this->is_active) {
            return false;
        }

        if ($this->start_date && $this->start_date > $now) {
            return false;
        }

        if ($this->end_date && $this->end_date < $now) {
            return false;
        }

        return true;
    }
}
