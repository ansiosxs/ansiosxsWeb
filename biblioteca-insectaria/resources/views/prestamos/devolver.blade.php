<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Registrar Devolución') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 max-w-2xl">

                    <div class="bg-gray-50 p-6 rounded-lg mb-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Información del Préstamo</h3>
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Socio</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->socio->nombre }} ({{ $prestamo->socio->rut }})</dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Ejemplar</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->ejemplar->libro->titulo }} - Cód: {{ $prestamo->ejemplar->codigo_barras }}</dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Fecha de Préstamo</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->fecha_prestamo->format('d/m/Y') }}</dd>
                            </div>
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Fecha Devolución Esperada</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}</dd>
                            </div>
                            @if($prestamo->fecha_devolucion_esperada->isPast())
                                <div class="sm:col-span-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                    <strong>⚠ PRÉSTAMO FUERA DE PLAZO:</strong> Venció el {{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }} (hace {{ $prestamo->fecha_devolucion_esperada->diffInDays(today()) }} días).
                                </div>
                            @endif
                        </dl>
                    </div>

                    <form method="POST" action="{{ route('prestamos.procesarDevolucion', $prestamo) }}">
                        @csrf

                        <div class="mb-6">
                            <label class="block text-gray-700 font-medium mb-1">Fecha de Devolución Real:</label>
                            <input type="date" name="fecha_devolucion_real" value="{{ now()->format('Y-m-d') }}" class="border-gray-300 rounded-md w-full @error('fecha_devolucion_real') border-red-500 @enderror" required>
                            @error('fecha_devolucion_real')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                            <p class="mt-1 text-sm text-gray-500">Por defecto se usa la fecha de hoy. Cambie si la devolución fue en otra fecha.</p>
                        </div>

                        <div class="flex items-center space-x-3">
                            <button type="submit" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Confirmar Devolución
                            </button>
                            <a href="{{ route('prestamos.show', $prestamo) }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Cancelar
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>