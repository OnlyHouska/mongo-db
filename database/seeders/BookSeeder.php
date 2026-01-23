<?php

namespace Database\Seeders;

use App\Enums\Genre;
use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title' => 'Harry Potter a kamen mudrcu',
                'author' => 'J.K. Rowling',
                'year' => 1997,
                'genre' => Genre::FANTASY,
                'available_copies' => 3,
            ],
            [
                'title' => '1984',
                'author' => 'George Orwell',
                'year' => 1949,
                'genre' => Genre::SCIFI,
                'available_copies' => 2,
            ],
            [
                'title' => 'Maly princ',
                'author' => 'Antoine de Saint-Exupery',
                'year' => 1943,
                'genre' => Genre::BELETRIE,
                'available_copies' => 5,
            ],
            [
                'title' => 'Dejiny ceskeho naroda',
                'author' => 'Frantisek Palacky',
                'year' => 1836,
                'genre' => Genre::HISTORIE,
                'available_copies' => 1,
            ],
            [
                'title' => 'Maj',
                'author' => 'Karel Hynek Macha',
                'year' => 1836,
                'genre' => Genre::POEZIE,
                'available_copies' => 4,
            ],
        ];

        foreach ($books as $bookData) {
            Book::updateOrCreate(
                ['title' => $bookData['title']],
                $bookData
            );
        }
    }
}
