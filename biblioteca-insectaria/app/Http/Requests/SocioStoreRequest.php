<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SocioStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'rut' => ['required', 'string', 'max:12', 'unique:socios,rut', 'rut_chileno'],
            'nombre' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'comuna' => 'nullable|string|max:100',
            'ocupacion' => 'nullable|string|max:100',
            'estado' => 'sometimes|in:Activo,Moroso,Inactivo',
        ];
    }

    public function messages(): array
    {
        return [
            'rut.required' => 'El RUN/RUT es obligatorio.',
            'rut.unique' => 'Este RUN/RUT ya se encuentra registrado.',
            'rut.rut_chileno' => 'El RUN/RUT ingresado no tiene un formato válido.',
            'nombre.required' => 'El nombre del socio es obligatorio.',
            'email.email' => 'Ingresa un formato de correo electrónico válido.',
        ];
    }
}
