<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Jmeno je povinne',
            'name.min' => 'Jmeno musi mit alespon 2 znaky',
            'email.required' => 'Email je povinny',
            'email.email' => 'Zadejte platny email',
            'email.unique' => 'Tento email je jiz registrovan',
            'password.required' => 'Heslo je povinne',
            'password.min' => 'Heslo musi mit alespon 6 znaku',
            'password.confirmed' => 'Hesla se neshoduji',
        ];
    }
}
