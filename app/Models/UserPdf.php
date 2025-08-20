<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPdf extends Model
{
    protected $fillable = [
        'user_id',
        'file_path',
        'file_name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
