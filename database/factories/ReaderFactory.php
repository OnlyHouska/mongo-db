<?php

namespace Database\Factories;

use App\Models\Reader;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReaderFactory extends Factory
{
    protected $model = Reader::class;

    public function definition(): array
    {
        $classes = ['1.A', '1.B', '2.A', '2.B', '2.C', '3.A', '3.B', '4.A', '4.B'];

        return [
            'name' => fake()->name(),
            'class' => fake()->randomElement($classes),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
