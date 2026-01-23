<?php

namespace App\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case LIBRARIAN = 'librarian';
    case READER = 'reader';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
