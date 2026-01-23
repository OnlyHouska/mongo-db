<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\HasMany;

class Reader extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'readers';

    protected $fillable = [
        'name',
        'class',
        'email',
    ];

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class, 'reader_id');
    }

    public function activeLoans(): HasMany
    {
        return $this->hasMany(Loan::class, 'reader_id')->whereNull('returned_at');
    }

    public function hasOverdueLoans(): bool
    {
        return $this->activeLoans()->where('due_date', '<', now())->exists();
    }
}
