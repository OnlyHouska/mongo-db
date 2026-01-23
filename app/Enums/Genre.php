<?php

namespace App\Enums;

enum Genre: string
{
    case BELETRIE = 'Beletrie';
    case SCIFI = 'Sci-fi';
    case FANTASY = 'Fantasy';
    case NAUCNA = 'Naucna';
    case POEZIE = 'Poezie';
    case DRAMA = 'Drama';
    case DETEKTIVKA = 'Detektivka';
    case HISTORIE = 'Historie';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
