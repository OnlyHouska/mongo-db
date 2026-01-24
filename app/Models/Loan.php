<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;

class Loan extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'loans';

    protected $fillable = [
        'book_id',
        'reader_id',
        'borrowed_at',
        'due_date',
        'returned_at',
    ];

    protected function casts(): array
    {
        return [
            'borrowed_at' => 'datetime',
            'due_date' => 'datetime',
            'returned_at' => 'datetime',
        ];
    }

    public function book(): BelongsTo
    {
        return $this->belongsTo(Book::class, 'book_id');
    }

    public function reader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reader_id');
    }

    public function isActive(): bool
    {
        return is_null($this->returned_at);
    }

    public function isOverdue(): bool
    {
        return $this->isActive() && $this->due_date->isPast();
    }

    public function isReturned(): bool
    {
        return !is_null($this->returned_at);
    }
}
