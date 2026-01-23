<?php

namespace App\Models;

use App\Enums\Genre;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'books';

    protected $fillable = [
        'title',
        'author',
        'year',
        'genre',
        'available_copies',
    ];

    protected function casts(): array
    {
        return [
            'year' => 'integer',
            'available_copies' => 'integer',
            'genre' => Genre::class,
        ];
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class, 'book_id');
    }

    public function activeLoans(): HasMany
    {
        return $this->hasMany(Loan::class, 'book_id')->whereNull('returned_at');
    }

    public function isAvailable(): bool
    {
        return $this->available_copies > 0;
    }
}
