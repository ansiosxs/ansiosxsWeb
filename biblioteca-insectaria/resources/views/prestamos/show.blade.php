<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Detalle del Préstamo') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 max-w-4xl">

                    <div class="flex justify-between items-center mb-6">
                        <div></div>
                        <div class="space-x-2">
                            @if(in_array($prestamo->estado, ['Prestado', 'Atrasado'], true))
                                <a href="{{ route('prestamos.devolver', $prestamo) }}" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                    Registrar Devolución
                                </a>
                            @endif
                            <a href="{{ route('prestamos.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Volver
                            </a>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg mb-6">
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Socio</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    <a href="{{ route('socios.show', $prestamo->socio) }}" class="text-blue-600 hover:underline font-bold">
                                        {{ $prestamo->socio->nombre }}
                                    </a>
                                    <br>
                                    <span class="text-gray-500">{{ $prestamo->socio->rut }}</span>
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Ejemplar</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ $prestamo->ejemplar->libro->titulo }}
                                    <br>
                                    <span class="text-gray-500">Código de barras: {{ $prestamo->ejemplar->codigo_barras }}</span>
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Fecha de Préstamo</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->fecha_prestamo->format('d/m/Y') }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Fecha Devolución Esperada</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Fecha Devolución Real</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->fecha_devolucion_real?->format('d/m/Y') ?? 'Pendiente' }}</dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Estado</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    <span class="px-2 py-1 text-xs font-medium rounded-full
                                        @if($prestamo->estado === 'Prestado') bg-blue-100 text-blue-800
                                        @elseif($prestamo->estado === 'Devuelto') bg-green-100 text-green-800
                                        @else bg-red-100 text-red-800 @endif">
                                        {{ $prestamo->estado }}
                                    </span>
                                    @if($prestamo->estado === 'Atrasado')
                                        <span class="ml-2 text-red-600 text-sm font-medium">⚠ FUERA DE PLAZO</span>
                                    @endif
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Días de Préstamo</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ $prestamo->fecha_prestamo->diffInDays($prestamo->fecha_devolucion_esperada) }} días
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Registrado el</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->created_at->format('d/m/Y H:i') }}</dd>
                            </div>
                        </dl>
                    </div>

                    @if($prestamo->estado === 'Atrasado')
                        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                            <strong>⚠ Préstamo fuera de plazo:</strong> Este préstamo venció el {{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}.
                            Han pasado {{ $prestamo->fecha_devolucion_esperada->diffInDays(today()) }} días desde la fecha esperada de devolución.
                        </div>
                    @endif

                </div>
            </div>
        </div>
    </div>
</x-app-layout>