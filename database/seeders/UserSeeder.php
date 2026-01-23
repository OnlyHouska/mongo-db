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
            ],
            [
                'name' => 'Knihovnik',
                'email' => 'knihovnik@knihovna.cz',
                'password' => 'password',
                'role' => UserRole::LIBRARIAN,
            ],
            [
                'name' => 'Ctenar',
                'email' => 'ctenar@knihovna.cz',
                'password' => 'password',
                'role' => UserRole::READER,
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
