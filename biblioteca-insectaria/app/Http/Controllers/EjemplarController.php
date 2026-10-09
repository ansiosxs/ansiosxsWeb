<?php

namespace App\Http\Controllers;

use App\Models\Ejemplar;
use App\Models\Libro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EjemplarController extends Controller
{
    // Mostrar formulario/vista para añadir ejemplares a un libro específico
    public function create(Libro $libro)
    {
        // Cargar los ejemplares que ya existen para este libro
        $libro->load('ejemplares');

        return view('ejemplares.create', compact('libro'));
    }

    // Guardar el ejemplar en la base de datos
    public function store(Request $request, Libro $libro)
    {
        $request->validate([
            'codigo_barras'  => 'required|string|unique:ejemplares,codigo_barras|max:50',
            'estado_fisico'  => 'required|string|max:50',
            'disponibilidad' => 'required|in:Disponible,En Mantención,Mantenimiento,Extraviado',
        ], [
            'codigo_barras.required' => 'Debes ingresar o escanear un código de barras.',
            'codigo_barras.unique' => 'Este código de barras ya está asignado a otro ejemplar.',
        ]);

        DB::transaction(function () use ($request, $libro) {
            $libro->ejemplares()->create([
                'codigo_barras'  => $request->codigo_barras,
                'estado_fisico'  => $request->estado_fisico,
                'disponibilidad' => $request->disponibilidad,
            ]);

            $libro->increment('cantidad');
        });

        return redirect()->route('libros.ejemplares.create', $libro->id)
            ->with('success', '¡Ejemplar escaneado y registrado con éxito!');
    }

    // Eliminar una copia física
    public function destroy(Ejemplar $ejemplar)
    {
        if ($ejemplar->prestamos()->exists()) {
            return redirect()->back()
                ->with('error', 'No se puede eliminar este ejemplar porque tiene préstamos asociados.');
        }

        $libroId = $ejemplar->libro_id;
        DB::transaction(function () use ($ejemplar) {
            $libro = Libro::findOrFail($ejemplar->libro_id);
            $ejemplar->delete();
            $libro->decrement('cantidad');
        });

        return redirect()->route('libros.ejemplares.create', $libroId)
            ->with('success', '¡Ejemplar eliminado correctamente!');
    }
}
