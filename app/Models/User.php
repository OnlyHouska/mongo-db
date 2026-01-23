<?php

namespace App\Models;

use App\Enums\UserRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use MongoDB\Laravel\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
        ];
    }

    public function getJWTIdentifier(): mixed
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [
            'role' => $this->role?->value ?? $this->role,
        ];
    }

    public function isAdmin(): bool
    {
        $role = $this->role instanceof UserRole ? $this->role : UserRole::tryFrom($this->role);
        return $role === UserRole::ADMIN;
    }

    public function isLibrarian(): bool
    {
        $role = $this->role instanceof UserRole ? $this->role : UserRole::tryFrom($this->role);
        return $role === UserRole::LIBRARIAN;
    }

    public function isReader(): bool
    {
        $role = $this->role instanceof UserRole ? $this->role : UserRole::tryFrom($this->role);
        return $role === UserRole::READER;
    }

    public function canManageLoans(): bool
    {
        return $this->isAdmin() || $this->isLibrarian();
    }
}
