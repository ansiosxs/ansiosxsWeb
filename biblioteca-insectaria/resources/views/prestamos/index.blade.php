<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Historial y Préstamos Activos
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

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

                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-bold text-gray-700">Listado de Préstamos</h3>
                    <a href="{{ route('prestamos.create') }}" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        + Registrar Préstamo
                    </a>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500 border border-gray-200">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                                <th class="py-3 px-4">ID</th>
                                <th class="py-3 px-4">Socio</th>
                                <th class="py-3 px-4">Ejemplar / Libro</th>
                                <th class="py-3 px-4">Fecha Préstamo</th>
                                <th class="py-3 px-4">Fecha Dev. Esperada</th>
                                <th class="py-3 px-4">Estado</th>
                                <th class="py-3 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($prestamos as $prestamo)
                                <tr class="bg-white border-b hover:bg-gray-50">
                                    <td class="py-2 px-4">{{ $prestamo->id }}</td>
                                    
                                    <td class="py-2 px-4">
                                        {{ $prestamo->socio->nombre ?? $prestamo->socio->rut ?? $prestamo->socio_id }}
                                    </td>

                                    <td class="py-2 px-4">
                                        {{ $prestamo->ejemplar->libro->titulo ?? 'Libro sin título' }} 
                                        <span class="text-xs text-gray-400">(Cód: {{ $prestamo->ejemplar->codigo_barras ?? $prestamo->ejemplar_id }})</span>
                                    </td>

                                    <td class="py-2 px-4">{{ $prestamo->fecha_prestamo }}</td>

                                    <td class="py-2 px-4">
                                        {{ $prestamo->fecha_devolucion_esperada }}
                                    </td>

                                    <td class="py-2 px-4">
                                        <span class="px-2 py-1 text-xs font-semibold rounded-full 
                                            {{ $prestamo->estado === 'Atrasado' ? 'bg-red-100 text-red-800' : ($prestamo->estado === 'Prestado' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800') }}">
                                            {{ $prestamo->estado }}
                                        </span>
                                    </td>

                                    <td class="py-2 px-4 text-center">
                                        @if (in_array($prestamo->estado, ['Prestado', 'Atrasado'], true))
                                            <form action="{{ route('prestamos.update', $prestamo->id) }}" method="POST" onsubmit="return confirm('¿Confirmar devolución de este ejemplar?');">
                                                @csrf
                                                @method('PUT')
                                                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-1 px-3 rounded">
                                                    Registrar Devolución
                                                </button>
                                            </form>
                                        @else
                                            <span class="text-xs text-gray-400 italic">{{ $prestamo->estado }}</span>
                                        @endif
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-4 text-gray-500">
                                        No hay registros de préstamos activos ni en el historial.
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