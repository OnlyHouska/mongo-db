<?php

namespace Database\Factories;

use App\Enums\Genre;
use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    protected $model = Book::class;

    public function definition(): array
    {
        return [
            'title' => fake()->sentence(3),
            'author' => fake()->name(),
            'year' => fake()->numberBetween(1900, date('Y')),
            'genre' => fake()->randomElement(Genre::values()),
            'available_copies' => fake()->numberBetween(1, 10),
        ];
    }
}
