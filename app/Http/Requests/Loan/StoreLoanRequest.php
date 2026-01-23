<?php

namespace App\Http\Requests\Loan;

use Illuminate\Foundation\Http\FormRequest;

class StoreLoanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->canManageLoans();
    }

    public function rules(): array
    {
        return [
            'book_id' => ['required', 'string'],
            'reader_id' => ['required', 'string'],
            'due_date' => ['sometimes', 'date', 'after:today'],
        ];
    }

    public function messages(): array
    {
        return [
            'book_id.required' => 'Kniha je povinna',
            'reader_id.required' => 'Ctenar je povinny',
            'due_date.date' => 'Neplatny format data',
            'due_date.after' => 'Datum vraceni musi byt v budoucnosti',
        ];
    }
}
