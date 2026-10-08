<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Detalle del Libro') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

            <!-- Alerta de éxito -->
            @if (session('success'))
                <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm" role="alert">
                    <p class="font-bold">¡Operación Exitosa!</p>
                    <p>{{ session('success') }}</p>
                </div>
            @endif

            <!-- Alerta de errores -->
            @if (session('error'))
                <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm" role="alert">
                    <p class="font-bold">Atención</p>
                    <p>{{ session('error') }}</p>
                </div>
            @endif

            <!-- Tarjeta de metadatos bibliográficos -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800">{{ $libro->titulo }}</h3>
                        <p class="text-gray-600 mt-1"><span class="font-semibold">Autor:</span> {{ $libro->autor }}</p>
                        <p class="text-gray-600"><span class="font-semibold">Sección:</span> {{ $libro->seccion }}</p>
                        <p class="text-gray-600"><span class="font-semibold">ID:</span> {{ $libro->id }}</p>
                    </div>
                    <div class="flex space-x-2">
                        <a href="{{ route('libros.edit', $libro->id) }}" class="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded">
                            Editar
                        </a>
                        <a href="{{ route('libros.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Volver
                        </a>
                    </div>
                </div>
            </div>

            <!-- Conteo dinámico de copias físicas disponibles -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h4 class="text-lg font-bold text-gray-800 mb-4">Resumen de Ejemplares</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-blue-700">{{ $libro->ejemplares->count() }}</p>
                        <p class="text-sm text-blue-600 font-medium">Total de copias</p>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-green-700">{{ $libro->ejemplares->where('disponibilidad', 'Disponible')->count() }}</p>
                        <p class="text-sm text-green-600 font-medium">Disponibles</p>
                    </div>
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                        <p class="text-3xl font-bold text-yellow-700">{{ $libro->ejemplares->where('disponibilidad', '!=', 'Disponible')->count() }}</p>
                        <p class="text-sm text-yellow-600 font-medium">No disponibles</p>
                    </div>
                </div>
            </div>

            <!-- Lista de ejemplares físicos -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h4 class="text-lg font-bold text-gray-800 mb-4">Ejemplares Físicos Registrados</h4>

                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="py-2 px-4 border-b text-left">Código de Barras</th>
                                <th class="py-2 px-4 border-b text-left">Estado Físico</th>
                                <th class="py-2 px-4 border-b text-left">Disponibilidad</th>
                                <th class="py-2 px-4 border-b text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($libro->ejemplares as $ejemplar)
                                <tr class="hover:bg-gray-50">
                                    <td class="py-2 px-4 border-b font-mono font-bold">{{ $ejemplar->codigo_barras }}</td>
                                    <td class="py-2 px-4 border-b">{{ $ejemplar->estado_fisico }}</td>
                                    <td class="py-2 px-4 border-b">
                                        <span class="px-2 py-1 rounded text-xs font-bold {{ $ejemplar->disponibilidad == 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                            {{ $ejemplar->disponibilidad }}
                                        </span>
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <form action="{{ route('ejemplares.destroy', $ejemplar->id) }}" method="POST" onsubmit="return confirm('¿Eliminar este ejemplar?');">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="text-red-600 hover:text-red-900 font-medium">Eliminar</button>
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="py-4 text-center text-gray-500">
                                        Este libro aún no tiene copias físicas/ejemplares registrados.
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>

                <div class="mt-6">
                    <a href="{{ route('libros.ejemplares.create', $libro->id) }}" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                        + Gestionar / Registrar Ejemplares
                    </a>
                </div>
            </div>

        </div>
    </div>
</x-app-layout>