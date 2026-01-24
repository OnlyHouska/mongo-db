<?php

namespace App\Http\Requests\Reader;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateReaderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        $readerId = $this->route('reader');

        return [
            'name' => ['sometimes', 'required', 'string', 'min:2', 'max:255'],
            'class' => ['sometimes', 'required', 'string', 'max:50'],
            'email' => ['sometimes', 'required', 'email', Rule::unique('users', 'email')->ignore($readerId)],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Jmeno je povinne',
            'name.min' => 'Jmeno musi mit alespon 2 znaky',
            'class.required' => 'Trida je povinna',
            'email.required' => 'Email je povinny',
            'email.email' => 'Zadejte platny email',
            'email.unique' => 'Tento email je jiz registrovan',
        ];
    }
}
