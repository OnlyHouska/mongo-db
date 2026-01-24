<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Administrator',
                'email' => 'admin@knihovna.cz',
                'password' => 'password',
                'role' => UserRole::ADMIN,
                'class' => null,
            ],
            [
                'name' => 'Knihovnik',
                'email' => 'knihovnik@knihovna.cz',
                'password' => 'password',
                'role' => UserRole::LIBRARIAN,
                'class' => null,
            ],
            [
                'name' => 'Ctenar',
                'email' => 'ctenar@knihovna.cz',
                'password' => 'password',
                'role' => UserRole::READER,
                'class' => 'Nezařazeno',
            ],
            // Sample readers
            [
                'name' => 'Jan Novak',
                'email' => 'jan.novak@skola.cz',
                'password' => 'password',
                'role' => UserRole::READER,
                'class' => '4.A',
            ],
            [
                'name' => 'Marie Svobodova',
                'email' => 'marie.svobodova@skola.cz',
                'password' => 'password',
                'role' => UserRole::READER,
                'class' => '3.B',
            ],
            [
                'name' => 'Petr Dvorak',
                'email' => 'petr.dvorak@skola.cz',
                'password' => 'password',
                'role' => UserRole::READER,
                'class' => '2.C',
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }
    }
}
