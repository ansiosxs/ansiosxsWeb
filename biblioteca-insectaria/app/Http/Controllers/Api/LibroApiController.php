<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Libro;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LibroApiController extends Controller
{
    use HasSpanishValidation;

    public function index(): JsonResponse
    {
        $libros = Libro::orderBy('titulo')->get();

        return response()->json($libros);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $this->validateSpanish($request, [
            'titulo' => 'required|string|min:2|max:255',
            'autor' => 'required|string|min:2|max:255',
            'seccion' => 'required|string|max:100',
            'cantidad' => 'required|integer|min:0',
        ], [
            'cantidad.integer' => 'La cantidad de ejemplares debe ser un número entero.',
            'cantidad.min' => 'La cantidad de ejemplares no puede ser negativa.',
        ]);

        $libro = Libro::create($validated);

        return response()->json($libro, 201);
    }

    public function show(Libro $libro): JsonResponse
    {
        return response()->json($libro);
    }

    public function update(Request $request, Libro $libro): JsonResponse
    {
        $validated = $this->validateSpanish($request, [
            'titulo' => 'required|string|min:2|max:255',
            'autor' => 'required|string|min:2|max:255',
            'seccion' => 'required|string|max:100',
            'cantidad' => 'required|integer|min:0',
        ], [
            'cantidad.integer' => 'La cantidad de ejemplares debe ser un número entero.',
            'cantidad.min' => 'La cantidad de ejemplares no puede ser negativa.',
        ]);

        $libro->update($validated);

        return response()->json($libro);
    }

    public function destroy(Libro $libro): JsonResponse
    {
        $libro->delete();

        return response()->json(null, 204);
    }
}
