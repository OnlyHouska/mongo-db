<?php

namespace App\Http\Requests\Book;

use App\Enums\Genre;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBookRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1000', 'max:' . date('Y')],
            'genre' => ['required', Rule::in(Genre::values())],
            'available_copies' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Nazev knihy je povinny',
            'author.required' => 'Autor je povinny',
            'year.required' => 'Rok vydani je povinny',
            'year.min' => 'Rok vydani musi byt vetsi nez 1000',
            'year.max' => 'Rok vydani nemuze byt v budoucnosti',
            'genre.required' => 'Zanr je povinny',
            'genre.in' => 'Neplatny zanr',
            'available_copies.required' => 'Pocet kopii je povinny',
            'available_copies.min' => 'Pocet kopii nemuze byt zaporny',
        ];
    }
}
