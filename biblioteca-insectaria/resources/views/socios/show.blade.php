<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Detalle del Socio') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 max-w-4xl">

                    <div class="flex justify-between items-center mb-6">
                        <div></div>
                        <div class="space-x-2">
                            <a href="{{ route('socios.edit', $socio) }}" class="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Editar
                            </a>
                            <a href="{{ route('socios.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Volver
                            </a>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg mb-6">
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">RUN/RUT</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $socio->rut }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Nombre</dt>
                                <dd class="mt-1 text-sm text-gray-900 font-bold">{{ $socio->nombre }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Correo Electrónico</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $socio->email ?? 'No registrado' }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Teléfono</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $socio->telefono ?? 'No registrado' }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Comuna</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $socio->comuna ?? 'No registrada' }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Ocupación</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $socio->ocupacion ?? 'No registrada' }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Estado</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    <span class="px-2 py-1 text-xs font-medium rounded-full
                                        @if($socio->estado === 'Activo') bg-green-100 text-green-800
                                        @elseif($socio->estado === 'Moroso') bg-red-100 text-red-800
                                        @else bg-gray-100 text-gray-800 @endif">
                                        {{ $socio->estado }}
                                    </span>
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Fecha de Registro</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $socio->created_at->format('d/m/Y H:i') }}</dd>
                            </div>
                        </dl>
                    </div>

                    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <div class="px-6 py-4 bg-gray-100 border-b border-gray-300">
                            <h3 class="text-lg font-medium text-gray-900">Historial de Préstamos</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr class="bg-gray-100">
                                        <th class="py-2 px-4 border-b text-left">Ejemplar</th>
                                        <th class="py-2 px-4 border-b text-left">Fecha Préstamo</th>
                                        <th class="py-2 px-4 border-b text-left">Fecha Devolución Esperada</th>
                                        <th class="py-2 px-4 border-b text-left">Fecha Devolución Real</th>
                                        <th class="py-2 px-4 border-b text-center">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($socio->prestamos as $prestamo)
                                    <tr class="hover:bg-gray-50 transition">
                                        <td class="py-2 px-4 border-b">{{ $prestamo->ejemplar->libro->titulo ?? 'N/A' }} ({{ $prestamo->ejemplar->codigo_barras }})</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->fecha_prestamo->format('d/m/Y') }}</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->fecha_devolucion_real?->format('d/m/Y') ?? 'Pendiente' }}</td>
                                        <td class="py-2 px-4 border-b text-center">
                                            <span class="px-2 py-1 text-xs font-medium rounded-full
                                                @if($prestamo->estado === 'En Cursada') bg-blue-100 text-blue-800
                                                @elseif($prestamo->estado === 'Devuelto') bg-green-100 text-green-800
                                                @else bg-red-100 text-red-800 @endif">
                                                {{ $prestamo->estado }}
                                            </span>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="5" class="py-4 px-4 text-center text-gray-500">No hay préstamos registrados.</td>
                                    </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>