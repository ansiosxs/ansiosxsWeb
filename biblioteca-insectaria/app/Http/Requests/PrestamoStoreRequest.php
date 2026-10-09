<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PrestamoStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'socio_id' => 'required|exists:socios,id',
            'ejemplar_id' => 'required|exists:ejemplares,id',
            'fecha_prestamo' => 'sometimes|date|before_or_equal:today',
        ];
    }

    public function messages(): array
    {
        return [
            'socio_id.required' => 'Debes seleccionar un socio.',
            'socio_id.exists' => 'El socio seleccionado no existe.',
            'ejemplar_id.required' => 'Debes seleccionar un ejemplar.',
            'ejemplar_id.exists' => 'El ejemplar seleccionado no existe.',
            'fecha_prestamo.before_or_equal' => 'La fecha de préstamo no puede ser futura.',
        ];
    }
}
