<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

trait HasSpanishValidation
{
    /**
     * Valida la request combinando los mensajes y atributos en español.
     *
     * Laravel 11+ ya no lee automáticamente messages()/attributes() desde el
     * controlador, por eso se pasan de forma explícita.
     *
     * @param  array<string, string>  $rules
     * @param  array<string, string>  $extraMessages
     * @return array<string, mixed>
     */
    protected function validateSpanish(Request $request, array $rules, array $extraMessages = []): array
    {
        return $request->validate(
            $rules,
            array_merge($this->messages(), $extraMessages),
            $this->attributes()
        );
    }

    /**
     * Mensajes de validación en español.
     *
     * @return array<string, string>
     */
    protected function messages(): array
    {
        return [
            'required' => 'El campo :attribute es obligatorio.',
            'min' => 'El campo :attribute debe tener al menos :min caracteres.',
            'max' => 'El campo :attribute no puede tener más de :max caracteres.',
            'string' => 'El campo :attribute debe ser texto.',
            'email' => 'El campo :attribute debe ser un correo electrónico válido.',
            'unique' => 'Este :attribute ya está registrado en otro registro.',
            'confirmed' => 'La confirmación no coincide.',
        ];
    }

    /**
     * Nombres de campo legibles en lugar de los nombres crudos de la BD.
     *
     * @return array<string, string>
     */
    protected function attributes(): array
    {
        return [
            'titulo' => 'título',
            'autor' => 'autor',
            'seccion' => 'sección',
            'cantidad' => 'cantidad de ejemplares',
            'codigo_barras' => 'código de barras',
            'estado_fisico' => 'estado físico',
            'disponibilidad' => 'disponibilidad',
            'name' => 'nombre',
            'email' => 'correo electrónico',
            'password' => 'contraseña',
            'device_name' => 'nombre del dispositivo',
        ];
    }
}
