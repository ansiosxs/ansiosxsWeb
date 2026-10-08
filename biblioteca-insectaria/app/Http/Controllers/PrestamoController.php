<?php

namespace App\Http\Controllers;

use App\Models\Prestamo;
use App\Models\Socio;
use App\Models\Ejemplar;
use Illuminate\Http\Request;

class PrestamoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $prestamos = Prestamo::with(['socio', 'ejemplar'])->latest()->paginate(10);
        return view('prestamos.index', compact('prestamos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $socios = Socio::where('estado', 'Activo')->get();
        $ejemplares = Ejemplar::all(); // Puedes filtrar si tienes un campo de estado/disponible

        return view('prestamos.create', compact('socios', 'ejemplares'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $request->validate([
                'socio_id'                  => 'required|exists:socios,id',
                'ejemplar_id'               => 'required|exists:ejemplares,id',
                'fecha_prestamo'            => 'required|date',
                'fecha_devolucion_esperada' => 'required|date|after_or_equal:fecha_prestamo',
                'estado'                    => 'required|in:En Cursada,Devuelto,Atrasado',
            ], [
                'socio_id.required'                  => 'Debes seleccionar un socio.',
                'socio_id.exists'                    => 'El socio seleccionado no existe.',
                'ejemplar_id.required'               => 'Debes seleccionar un ejemplar.',
                'ejemplar_id.exists'                  => 'El ejemplar seleccionado no existe.',
                'fecha_prestamo.required'            => 'La fecha de préstamo es obligatoria.',
                'fecha_devolucion_esperada.required' => 'La fecha esperada de devolución es obligatoria.',
                'fecha_devolucion_esperada.after_or_equal' => 'La fecha esperada debe ser posterior o igual a la fecha de préstamo.',
            ]);

            Prestamo::create([
                'socio_id'                  => $request->socio_id,
                'ejemplar_id'               => $request->ejemplar_id,
                'fecha_prestamo'            => $request->fecha_prestamo,
                'fecha_devolucion_esperada' => $request->fecha_devolucion_esperada,
                'fecha_devolucion_real'     => $request->fecha_devolucion_real ?? null,
                'estado'                    => $request->estado ?? 'En Cursada',
            ]);

            return redirect()->route('prestamos.index')->with('success', '¡Préstamo registrado exitosamente!');
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
