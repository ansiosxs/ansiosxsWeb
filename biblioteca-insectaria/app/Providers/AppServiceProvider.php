<?php

namespace App\Providers;

use App\Rules\RutChileno;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Validator::extend('rut_chileno', function ($attribute, $value, $parameters, $validator) {
            $rule = new RutChileno;
            $passes = true;
            $rule->validate($attribute, $value, function () use (&$passes) {
                $passes = false;
            });

            return $passes;
        });

        Validator::replacer('rut_chileno', function ($message, $attribute, $rule, $parameters) {
            return str_replace(':attribute', $attribute, 'El :attribute debe tener un formato válido (ej: 12345678-9).');
        });
    }
}
