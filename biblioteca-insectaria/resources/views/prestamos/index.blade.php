<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Préstamos') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    @if (session('success'))
                        <div class="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm" role="alert">
                            <p class="font-bold">¡Operación Exitosa!</p>
                            <p>{{ session('success') }}</p>
                        </div>
                    @endif

                    @if (session('error'))
                        <div class="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm" role="alert">
                            <p class="font-bold">Atención</p>
                            <p>{{ session('error') }}</p>
                        </div>
                    @endif

                    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <a href="{{ route('prestamos.create') }}" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow transition ease-in-out duration-150 inline-block">
                            + Nuevo Préstamo
                        </a>

                        <div class="flex flex-wrap gap-4">
                            <form method="GET" action="{{ route('prestamos.index') }}" class="min-w-[250px]">
                                <input type="text" name="search" placeholder="Buscar por socio, libro..." value="{{ request('search') }}"
                                    class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            </form>
                            <form method="GET" action="{{ route('prestamos.index') }}" class="min-w-[200px]">
                                <select name="estado" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                                    <option value="">Todos los estados</option>
                                    <option value="En Cursada" {{ request('estado') === 'En Cursada' ? 'selected' : '' }}>En Curso</option>
                                    <option value="Devuelto" {{ request('estado') === 'Devuelto' ? 'selected' : '' }}>Devuelto</option>
                                    <option value="Atrasado" {{ request('estado') === 'Atrasado' ? 'selected' : '' }}>Atrasado</option>
                                </select>
                            </form>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="py-2 px-4 border-b text-left">Socio</th>
                                    <th class="py-2 px-4 border-b text-left">Ejemplar (Libro)</th>
                                    <th class="py-2 px-4 border-b text-center">Fecha Préstamo</th>
                                    <th class="py-2 px-4 border-b text-center">Devolución Esperada</th>
                                    <th class="py-2 px-4 border-b text-center">Devolución Real</th>
                                    <th class="py-2 px-4 border-b text-center">Estado</th>
                                    <th class="py-2 px-4 border-b text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($prestamos as $prestamo)
                                <tr class="hover:bg-gray-50 transition @if($prestamo->estado === 'Atrasado' || ($prestamo->estado === 'En Cursada' && $prestamo->fecha_devolucion_esperada->isPast())) bg-red-50 @endif">
                                    <td class="py-2 px-4 border-b">
                                        {{ $prestamo->socio->nombre }}<br>
                                        <span class="text-sm text-gray-500">{{ $prestamo->socio->rut }}</span>
                                    </td>
                                    <td class="py-2 px-4 border-b">
                                        {{ $prestamo->ejemplar->libro->titulo ?? 'N/A' }}<br>
                                        <span class="text-sm text-gray-500">Cód: {{ $prestamo->ejemplar->codigo_barras }}</span>
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">{{ $prestamo->fecha_prestamo->format('d/m/Y') }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}</td>
                                    <td class="py-2 px-4 border-b text-center">{{ $prestamo->fecha_devolucion_real?->format('d/m/Y') ?? 'Pendiente' }}</td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full
                                            @if($prestamo->estado === 'En Cursada') bg-blue-100 text-blue-800
                                            @elseif($prestamo->estado === 'Devuelto') bg-green-100 text-green-800
                                            @else bg-red-100 text-red-800 @endif">
                                            {{ $prestamo->estado }}
                                        </span>
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <div class="flex justify-center space-x-3">
                                            <a href="{{ route('prestamos.show', $prestamo) }}" class="text-blue-600 hover:text-blue-900 font-medium">Ver</a>
                                            @if($prestamo->estado === 'En Cursada')
                                                <a href="{{ route('prestamos.devolver', $prestamo) }}" class="text-green-600 hover:text-green-900 font-medium">Devolver</a>
                                            @endif
                                            <a href="{{ route('prestamos.edit', $prestamo) }}" class="text-yellow-600 hover:text-yellow-900 font-medium">Editar</a>
                                            <form action="{{ route('prestamos.destroy', $prestamo) }}" method="POST" class="inline"
                                                onsubmit="return confirm('¿Está seguro de eliminar este préstamo?')">
                                                @csrf @method('DELETE')
                                                <button type="submit" class="text-red-600 hover:text-red-900 font-medium">Eliminar</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="7" class="py-4 px-4 text-center text-gray-500">No hay préstamos registrados.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-4">
                        {{ $prestamos->links() }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>