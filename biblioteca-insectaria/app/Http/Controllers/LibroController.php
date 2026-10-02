<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Libro;

class LibroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Extraer todos los libros de la base de datos
        $libros = Libro::all();

        // Enviar esos libros a la vista "index"
        return view('libros.index', compact('libros'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('libros.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo'  => 'required|string|min:2|max:255',
            'autor'   => 'required|string|min:2|max:255',
            'seccion' => 'required|string|max:100',
        ], [
            'titulo.required'  => 'El título del libro es obligatorio.',
            'titulo.min'       => 'El título debe tener al menos 2 caracteres.',
            'autor.required'   => 'El nombre del autor es obligatorio.',
            'autor.min'        => 'El autor debe tener al menos 2 caracteres.',
            'seccion.required' => 'La sección o estante es obligatoria.',
        ]);

        // 1. Guardar los datos del formulario en la base de datos
        Libro::create([
            'titulo' => $request->titulo,
            'autor' => $request->autor,
            'seccion' => $request->seccion,
        ]);

        // 3. Redirigir con mensaje de éxito
        return redirect()->route('libros.index')->with('success', '¡El libro fue registrado exitosamente!');
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
        // CORRECCIÓN: Buscar el libro antes de enviarlo a la vista
        $libro = Libro::findOrFail($id);

        return view('libros.edit', compact('libro'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // 1. Validar
        $request->validate([
            'titulo'  => 'required|string|min:2|max:255',
            'autor'   => 'required|string|min:2|max:255',
            'seccion' => 'required|string|max:100',
        ]);

        // 2. Buscar el libro primero por su ID
        $libro = Libro::findOrFail($id);

        // 3. Actualizar
        $libro->update([
            'titulo'  => $request->titulo,
            'autor'   => $request->autor,
            'seccion' => $request->seccion,
        ]);

        return redirect()->route('libros.index')->with('success', '¡Información del libro actualizada correctamente!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // CORRECCIÓN: Buscar el libro antes de eliminarlo
        $libro = Libro::findOrFail($id);
        
        $libro->delete();

        return redirect()->route('libros.index')->with('success', 'Libro eliminado con éxito.');
    }
}