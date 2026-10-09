<?php

namespace App\Http\Controllers;

use App\Models\Socio;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class SocioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $socios = Socio::latest()->paginate(10);
        return view('socios.index', compact('socios'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('socios.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge(['rut' => $this->normalizeRut($request->input('rut'))]);

        $request->validate([
            'rut'      => ['required', 'string', 'max:12', $this->rutValidationRule()],
            'nombre'   => 'required|string|max:255',
            'email'    => 'nullable|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'comuna'   => 'nullable|string|max:100',
            'estado'   => 'required|in:Activo,Moroso,Inactivo',
        ], [
            'rut.required'    => 'El RUT es obligatorio.',
            'nombre.required' => 'El nombre del socio es obligatorio.',
            'email.email'     => 'Ingresa un formato de correo electrónico válido.',
        ]);

        Socio::create([
            'rut'      => $request->rut,
            'nombre'   => $request->nombre,
            'email'    => $request->email,
            'telefono' => $request->telefono,
            'comuna'   => $request->comuna ?? 'Concepción',
            'estado'   => $request->estado ?? 'Activo',
        ]);

        return redirect()->route('socios.index')->with('success', '¡Socio registrado exitosamente!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $socio = Socio::findOrFail($id);

        return view('socios.edit', compact('socio'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $socio = Socio::findOrFail($id);
        $request->merge(['rut' => $this->normalizeRut($request->input('rut'))]);

        $validated = $request->validate([
            'rut'      => ['required', 'string', 'max:12', $this->rutValidationRule($socio->id)],
            'nombre'   => 'required|string|max:255',
            'email'    => 'nullable|email|max:255',
            'telefono' => 'nullable|string|max:20',
            'comuna'   => 'nullable|string|max:100',
            'estado'   => 'required|in:Activo,Moroso,Inactivo',
        ], [
            'rut.required'    => 'El RUT es obligatorio.',
            'nombre.required' => 'El nombre del socio es obligatorio.',
            'email.email'     => 'Ingresa un formato de correo electrónico válido.',
        ]);

        $socio->update($validated);

        return redirect()->route('socios.index')->with('success', '¡Información del socio actualizada correctamente!');
    }

    private function normalizeRut(mixed $rut): mixed
    {
        if (! is_string($rut)) {
            return $rut;
        }

        $rut = strtoupper((string) preg_replace('/[.\-\s]/', '', trim($rut)));

        if (preg_match('/^\d{2,9}$/', $rut) !== 1) {
            return $rut;
        }

        return substr($rut, 0, -1).'-'.substr($rut, -1);
    }

    private function rutValidationRule(?int $ignoreId = null): \Closure
    {
        return function (string $attribute, mixed $value, \Closure $fail) use ($ignoreId): void {
            if (! is_string($value) || ! $this->hasValidRutCheckDigit($value)) {
                $fail('Ingresa un RUT válido, por ejemplo 12345678-5.');
                return;
            }

            $canonicalRut = str_replace('-', '', strtoupper($value));
            $duplicate = Socio::query()
                ->whereRaw("REPLACE(REPLACE(REPLACE(UPPER(rut), '.', ''), '-', ''), ' ', '') = ?", [$canonicalRut])
                ->when($ignoreId !== null, fn (Builder $query) => $query->where('id', '!=', $ignoreId))
                ->exists();

            if ($duplicate) {
                $fail('Este RUT ya se encuentra registrado.');
            }
        };
    }

    private function hasValidRutCheckDigit(string $rut): bool
    {
        if (preg_match('/^(\d{1,8})-([\dK])$/', $rut, $matches) !== 1) {
            return false;
        }

        $body = strrev($matches[1]);
        $sum = 0;
        $factor = 2;

        for ($index = 0, $length = strlen($body); $index < $length; $index++) {
            $sum += (int) $body[$index] * $factor;
            $factor = $factor === 7 ? 2 : $factor + 1;
        }

        $remainder = 11 - ($sum % 11);
        $expectedCheckDigit = match ($remainder) {
            11 => '0',
            10 => 'K',
            default => (string) $remainder,
        };

        return $matches[2] === $expectedCheckDigit;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $socio = Socio::findOrFail($id);

        if ($socio->prestamos()->exists()) {
            return redirect()->route('socios.index')
                ->with('error', 'No se puede eliminar este socio porque tiene préstamos asociados.');
        }

        $socio->delete();

        return redirect()->route('socios.index')->with('success', 'Socio eliminado correctamente.');
    }
}
