<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class RutChileno implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $rut = strtoupper(str_replace(['.', '-'], '', (string) $value));

        if (! preg_match('/^\d{7,8}[0-9K]$/', $rut)) {
            $fail('El :attribute debe tener un formato válido (ej: 12345678-9).');

            return;
        }

        $body = substr($rut, 0, -1);
        $dv = substr($rut, -1);
        $calculatedDv = $this->calcularDigitoVerificador($body);

        if ($dv !== $calculatedDv) {
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
