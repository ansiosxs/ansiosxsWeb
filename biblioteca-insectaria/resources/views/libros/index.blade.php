<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Gestión de Libros
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-bold text-gray-700">Inventario de Libros</h3>
                    <a href="{{ route('libros.create') }}" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        + Agregar Nuevo Libro
                    </a>
                </div>

                @if (session('success'))
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {{ session('success') }}
                    </div>
                @endif
                @if (session('error'))
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {{ session('error') }}
                    </div>
                @endif

                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr class="bg-gray-100 border-b">
                                <th class="py-2 px-4 border-r text-left">ID</th>
                                <th class="py-2 px-4 border-r text-left">Título</th>
                                <th class="py-2 px-4 border-r text-left">Autor</th>
                                <th class="py-2 px-4 border-r text-left">Sección</th>
                                <th class="py-2 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($libros as $libro)
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="py-2 px-4 border-r">{{ $libro->id }}</td>
                                    <td class="py-2 px-4 border-r">{{ $libro->titulo }}</td>
                                    <td class="py-2 px-4 border-r">{{ $libro->autor }}</td>
                                    <td class="py-2 px-4 border-r">{{ $libro->seccion ?? 'N/A' }}</td>
                                    <td class="py-2 px-4 text-center flex justify-center gap-2">
                                        <a href="{{ route('libros.ejemplares.create', $libro->id) }}" class="text-green-600 hover:underline font-semibold">
                                            + Ejemplar
                                        </a>
                                        <a href="{{ route('libros.edit', $libro->id) }}" class="text-blue-600 hover:underline">Editar</a>
                                        <form action="{{ route('libros.destroy', $libro->id) }}" method="POST" onsubmit="return confirm('¿Seguro que deseas eliminar este libro?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-red-600 hover:underline">Eliminar</button>
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="5" class="text-center py-4 text-gray-500">
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
</x-app-layout>