<?php

namespace App\Http\Controllers;

use App\Models\Prestamo;
use App\Models\Socio;
use App\Models\Ejemplar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PrestamoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Ejemplar::where('disponibilidad', 'Prestado')
            ->whereDoesntHave('prestamos', function ($query) {
                $query->whereIn('estado', ['Prestado', 'Atrasado']);
            })
            ->update(['disponibilidad' => 'Disponible']);

        Prestamo::where('estado', 'Prestado')
            ->whereDate('fecha_devolucion_esperada', '<', now()->toDateString())
            ->update(['estado' => 'Atrasado']);

        $prestamos = Prestamo::with(['socio', 'ejemplar.libro'])->latest()->paginate(10);
        return view('prestamos.index', compact('prestamos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $socios = Socio::where('estado', 'Activo')->get();
        $ejemplares = Ejemplar::with('libro')
            ->where('disponibilidad', 'Disponible')
            ->get();

        return view('prestamos.create', compact('socios', 'ejemplares'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'socio_id'                  => ['required', Rule::exists('socios', 'id')->where('estado', 'Activo')],
            'ejemplar_id'               => 'required|exists:ejemplares,id',
            'fecha_prestamo'            => 'required|date',
            'fecha_devolucion_esperada' => 'required|date|after_or_equal:fecha_prestamo',
        ]);

        $created = DB::transaction(function () use ($request) {
            $claimed = Ejemplar::whereKey($request->ejemplar_id)
                ->where('disponibilidad', 'Disponible')
                ->update(['disponibilidad' => 'Prestado']);

            if ($claimed !== 1) {
                return false;
            }

            Prestamo::create([
                'socio_id'                  => $request->socio_id,
                'ejemplar_id'               => $request->ejemplar_id,
                'fecha_prestamo'            => $request->fecha_prestamo,
                'fecha_devolucion_esperada' => $request->fecha_devolucion_esperada,
                'estado'                    => 'Prestado',
            ]);

            return true;
        });

        if (! $created) {
            return redirect()->back()->with('error', 'El ejemplar seleccionado ya se encuentra prestado.')->withInput();
        }

        return redirect()->route('prestamos.index')->with('success', '¡Préstamo registrado correctamente!');
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
        $returned = DB::transaction(function () use ($id) {
            $prestamo = Prestamo::findOrFail($id);

            $updated = Prestamo::whereKey($prestamo->id)
                ->whereIn('estado', ['Prestado', 'Atrasado'])
                ->update([
                    'estado' => 'Devuelto',
                    'fecha_devolucion_real' => now()->toDateString(),
                ]);

            if ($updated !== 1) {
                return false;
            }

            Ejemplar::whereKey($prestamo->ejemplar_id)
                ->where('disponibilidad', 'Prestado')
                ->update(['disponibilidad' => 'Disponible']);

            return true;
        });

        if (! $returned) {
            return redirect()->route('prestamos.index')
                ->with('error', 'Este préstamo ya no está activo y no se puede registrar otra devolución.');
        }

        return redirect()->route('prestamos.index')->with('success', '¡Devolución registrada y ejemplar liberado!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
