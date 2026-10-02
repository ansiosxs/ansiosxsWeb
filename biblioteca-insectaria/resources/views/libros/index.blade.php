<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Inventario de la Biblioteca') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    
                    <!-- Alerta de éxito -->
                    @if (session('success'))
                        <div class="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm" role="alert">
                            <p class="font-bold">¡Operación Exitosa!</p>
                            <p>{{ session('success') }}</p>
                        </div>
                    @endif

                    <!-- Alerta de errores -->
                    @if (session('error'))
                        <div class="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm" role="alert">
                            <p class="font-bold">Atención</p>
                            <p>{{ session('error') }}</p>
                        </div>
                    @endif

                    <!-- Botón para ir a agregar más libros -->
                    <div class="mb-6">
                        <a href="{{ route('libros.create') }}" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow transition ease-in-out duration-150 inline-block">
                            + Agregar Nuevo Libro
                        </a>
                    </div>

                    <!-- Tabla del inventario -->
                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="py-2 px-4 border-b text-left">ID</th>
                                    <th class="py-2 px-4 border-b text-left">Título</th>
                                    <th class="py-2 px-4 border-b text-left">Autor</th>
                                    <th class="py-2 px-4 border-b text-left">Sección</th>
                                    <th class="py-2 px-4 border-b text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($libros as $libro)
                                <tr class="hover:bg-gray-50 transition">
                                    <td class="py-2 px-4 border-b">{{ $libro->id }}</td>
                                    <td class="py-2 px-4 border-b font-bold">{{ $libro->titulo }}</td>
                                    <td class="py-2 px-4 border-b">{{ $libro->autor }}</td>
                                    <td class="py-2 px-4 border-b">{{ $libro->seccion }}</td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <div class="flex justify-center space-x-3">
                                            <!-- Ver/Gestionar Ejemplares -->
                                            <a href="{{ route('libros.ejemplares.create', $libro->id) }}" class="text-green-600 hover:text-green-900 font-medium">
                                                Ejemplares ({{ $libro->ejemplares->count() }})
                                            </a>
                                            <!-- Botón Editar -->
                                            <a href="{{ route('libros.edit', $libro->id) }}" class="text-indigo-600 hover:text-indigo-900 font-medium">Editar</a>
                                            
                                            <!-- Botón Eliminar -->
                                            <form action="{{ route('libros.destroy', $libro->id) }}" method="POST" onsubmit="return confirm('¿Estás seguro de eliminar este libro del inventario?');">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="text-red-600 hover:text-red-900 font-medium">Eliminar</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="5" class="py-4 px-4 text-center text-gray-500">
                                        No hay libros registrados en el inventario actualmente.
                                    </td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>