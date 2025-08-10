<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    /**
     * Get the users for the community
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the worship schedules for the community
     */
    public function worshipSchedules()
    {
        return $this->belongsToMany(
            WorshipSchedule::class, 
            'worship_schedule_communities',
            'community_id',          // foreign key for current model
            'worship_schedules_id'   // foreign key for other model
        );
    }
}
