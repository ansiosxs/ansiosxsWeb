<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SocioStoreRequest;
use App\Http\Requests\SocioUpdateRequest;
use App\Models\Socio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SocioApiController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Socio::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('rut', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        $socios = $query->latest()->paginate($request->get('per_page', 15));

        return response()->json($socios);
    }

    public function store(SocioStoreRequest $request): JsonResponse
    {
        $socio = Socio::create($request->validated() + ['estado' => 'Activo']);

        return response()->json($socio, 201);
    }

    public function show(Socio $socio): JsonResponse
    {
        $socio->load(['prestamos.ejemplar.libro']);

        return response()->json($socio);
    }

    public function update(SocioUpdateRequest $request, Socio $socio): JsonResponse
    {
        $socio->update($request->validated());

        return response()->json($socio);
    }

    public function destroy(Socio $socio): JsonResponse
    {
        $socio->delete();

        return response()->json(['message' => 'Socio eliminado correctamente']);
    }
}
