<?php

namespace App\Policies;

use App\Models\Reader;
use App\Models\User;

class ReaderPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isLibrarian();
    }

    public function view(User $user, Reader $reader): bool
    {
        return $user->isAdmin() || $user->isLibrarian();
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, Reader $reader): bool
    {
        return $user->isAdmin();
    }

    public function delete(User $user, Reader $reader): bool
    {
        return $user->isAdmin();
    }
}
