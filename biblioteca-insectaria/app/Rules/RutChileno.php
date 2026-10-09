<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class RutChileno implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $rut = strtoupper((string) $value);

        if (! preg_match('/^(\d{7,8})-([0-9K])$/', $rut, $matches)) {
            $fail('El :attribute debe tener un formato válido (ej: 12345678-5).');

            return;
        }

        $calculatedDv = $this->calcularDigitoVerificador($matches[1]);

        if ($matches[2] !== $calculatedDv) {
            $fail('El :attribute no es válido (dígito verificador incorrecto).');
        }
    }

    private function calcularDigitoVerificador(string $rut): string
    {
        $suma = 0;
        $multiplicador = 2;

        for ($i = strlen($rut) - 1; $i >= 0; $i--) {
            $suma += (int) $rut[$i] * $multiplicador;
            $multiplicador = $multiplicador === 7 ? 2 : $multiplicador + 1;
        }

        $resto = $suma % 11;
        $dv = 11 - $resto;

        if ($dv === 11) {
            return '0';
        }
        if ($dv === 10) {
            return 'K';
        }

        return (string) $dv;
    }
}
