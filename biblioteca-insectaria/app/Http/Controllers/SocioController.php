<?php

namespace App\Http\Controllers;

use App\Http\Requests\SocioStoreRequest;
use App\Http\Requests\SocioUpdateRequest;
use App\Models\Socio;
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

        $socios = $query->latest()->paginate(10)->withQueryString();

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
        $socio = Socio::create($request->validated() + [
            'comuna' => 'Concepción',
            'estado' => 'Activo',
        ]);

        if ($request->wantsJson()) {
            return response()->json($socio, 201);
        }

        return redirect()->route('socios.index')->with('success', '¡Socio registrado exitosamente!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $socio = Socio::with(['prestamos.ejemplar.libro'])->findOrFail($id);
        if ($request->wantsJson()) {
            return response()->json($socio);
        }

        return view('socios.show', compact('socio'));
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
    public function update(SocioUpdateRequest $request, Socio $socio)
    {
        $socio->update($request->validated());

        if ($request->wantsJson()) {
            return response()->json($socio);
        }

        return redirect()->route('socios.index')->with('success', '¡Información del socio actualizada correctamente!');
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
