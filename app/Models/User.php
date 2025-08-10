<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'phone_number',
        'password',
        'address',
        'birth_date',
        'gender',
        'community_id',
        'role_id',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'birth_date' => 'date',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the user's role
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the user's community
     */
    public function community()
    {
        return $this->belongsTo(Community::class);
    }

    /**
     * Check if user is admin
     */
    public function isAdmin(): bool
    {
        return $this->role?->name === 'admin';
    }

    /**
     * Check if user is umat
     */
    public function isUmat(): bool
    {
        return $this->role?->name === 'umat';
    }

    /**
     * Get role display name
     */
    public function getRoleDisplayName(): string
    {
        return $this->role?->name ?? 'Unknown';
    }
}