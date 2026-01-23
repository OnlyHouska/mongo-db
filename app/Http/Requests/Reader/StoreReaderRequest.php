<?php

namespace App\Http\Requests\Reader;

use Illuminate\Foundation\Http\FormRequest;

class StoreReaderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->isAdmin();
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'class' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'unique:readers,email'],
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
