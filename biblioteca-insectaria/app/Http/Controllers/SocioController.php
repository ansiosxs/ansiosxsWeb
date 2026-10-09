<?php

namespace App\Http\Controllers;

use App\Http\Requests\SocioStoreRequest;
use App\Http\Requests\SocioUpdateRequest;
use App\Models\Socio;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SocioController extends Controller
{
    public function index(Request $request)
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

        $socios = $query->latest()->paginate(10);

        if ($request->wantsJson()) {
            return response()->json($socios);
        }

        return view('socios.index', compact('socios'));
    }

    public function create()
    {
        return view('socios.create');
    }

    public function store(SocioStoreRequest $request)
    {
        $socio = Socio::create($request->validated() + ['estado' => 'Activo']);

        if ($request->wantsJson()) {
            return response()->json($socio, 201);
        }

        return redirect()->route('socios.index')->with('success', '¡Socio registrado exitosamente!');
    }

    public function show(Socio $socio, Request $request)
    {
        $socio->load(['prestamos.ejemplar.libro']);

        if ($request->wantsJson()) {
            return response()->json($socio);
        }

        return view('socios.show', compact('socio'));
    }

    public function edit(Socio $socio)
    {
        return view('socios.edit', compact('socio'));
    }

    public function update(SocioUpdateRequest $request, Socio $socio)
    {
        $socio->update($request->validated());

        if ($request->wantsJson()) {
            return response()->json($socio);
        }

        return redirect()->route('socios.index')->with('success', '¡Socio actualizado exitosamente!');
    }

    public function destroy(Socio $socio, Request $request)
    {
        $socio->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Socio eliminado correctamente']);
        }

        return redirect()->route('socios.index')->with('success', '¡Socio eliminado exitosamente!');
    }

    public function apiIndex(Request $request): JsonResponse
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

    public function apiShow(Socio $socio): JsonResponse
    {
        $socio->load(['prestamos.ejemplar.libro']);

        return response()->json($socio);
    }

    public function apiStore(SocioStoreRequest $request): JsonResponse
    {
        $socio = Socio::create($request->validated() + ['estado' => 'Activo']);

        return response()->json($socio, 201);
    }

    public function apiUpdate(SocioUpdateRequest $request, Socio $socio): JsonResponse
    {
        $socio->update($request->validated());

        return response()->json($socio);
    }

    public function apiDestroy(Socio $socio): JsonResponse
    {
        $socio->delete();

        return response()->json(['message' => 'Socio eliminado correctamente']);
    }
}
