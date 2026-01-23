<?php

namespace Database\Seeders;

use App\Models\Reader;
use Illuminate\Database\Seeder;

class ReaderSeeder extends Seeder
{
    public function run(): void
    {
        $readers = [
            [
                'name' => 'Jan Novak',
                'class' => '4.A',
                'email' => 'jan.novak@skola.cz',
            ],
            [
                'name' => 'Marie Svobodova',
                'class' => '3.B',
                'email' => 'marie.svobodova@skola.cz',
            ],
            [
                'name' => 'Petr Dvorak',
                'class' => '2.C',
                'email' => 'petr.dvorak@skola.cz',
            ],
        ];

        foreach ($readers as $readerData) {
            Reader::updateOrCreate(
                ['email' => $readerData['email']],
                $readerData
            );
        }
    }
}
