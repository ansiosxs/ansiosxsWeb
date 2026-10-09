<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Libro;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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
            'cantidad' => ['sometimes', 'integer', Rule::in([0])],
        ], [
            'cantidad.in' => 'La cantidad debe ser cero al crear el libro; registre los ejemplares físicos por separado.',
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
            'cantidad' => ['sometimes', 'integer', Rule::in([$libro->cantidad])],
        ], [
            'cantidad.in' => 'La cantidad se calcula con los ejemplares físicos y no se puede modificar desde esta API.',
        ]);

        $libro->update($validated);

        return response()->json($libro);
    }

    public function destroy(Libro $libro): JsonResponse
    {
        if ($libro->ejemplares()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar este libro mientras tenga ejemplares físicos asociados.',
            ], 409);
        }

        $libro->delete();

        return response()->json(null, 204);
    }
}
