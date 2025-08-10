<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorshipScheduleCommunity extends Model
{
    use HasFactory;

    protected $fillable = [
        'worship_schedules_id',
        'community_id',
    ];

    /**
     * Get the worship schedule that owns the pivot
     */
    public function worshipSchedule()
    {
        return $this->belongsTo(WorshipSchedule::class, 'worship_schedules_id');
    }

    /**
     * Get the community that owns the pivot
     */
    public function community()
    {
        return $this->belongsTo(Community::class);
    }
}
