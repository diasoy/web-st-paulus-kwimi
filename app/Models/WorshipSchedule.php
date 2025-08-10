<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorshipSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'pic',
        'time_start',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'time_start' => 'datetime:H:i:s',
        ];
    }

    /**
     * Get the communities for the worship schedule
     */
    public function communities()
    {
        return $this->belongsToMany(Community::class, 'worship_schedule_communities');
    }

    /**
     * Get the worship schedule communities
     */
    public function worshipScheduleCommunities()
    {
        return $this->hasMany(WorshipScheduleCommunity::class, 'worship_schedules_id');
    }
}
