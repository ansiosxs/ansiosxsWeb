<?php

namespace App\Http\Controllers;

use App\Models\Socio;
use Illuminate\Http\Request;

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
            $request->validate([
                'rut'      => 'required|string|max:12|unique:socios,rut',
                'nombre'   => 'required|string|max:255',
                'email'    => 'nullable|email|max:255',
                'telefono' => 'nullable|string|max:20',
                'comuna'   => 'nullable|string|max:100',
                'estado'   => 'required|in:Activo,Moroso,Inactivo',
            ], [
                'rut.required'   => 'El RUT es obligatorio.',
                'rut.unique'     => 'Este RUT ya se encuentra registrado.',
                'nombre.required' => 'El nombre del socio es obligatorio.',
                'email.email'    => 'Ingresa un formato de correo electrónico válido.',
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
