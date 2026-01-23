<?php

namespace App\Policies;

use App\Models\Loan;
use App\Models\User;

class LoanPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->canManageLoans();
    }

    public function view(User $user, Loan $loan): bool
    {
        return $user->canManageLoans() || $loan->reader_id === $user->_id;
    }

    public function create(User $user): bool
    {
        return $user->canManageLoans();
    }

    public function return(User $user, Loan $loan): bool
    {
        return $user->canManageLoans();
    }
}
