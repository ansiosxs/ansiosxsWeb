<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Registrar Nuevo Préstamo') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 max-w-2xl">

                    <form method="POST" action="{{ route('prestamos.store') }}">
                        @csrf

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Socio:</label>
                            <select name="socio_id" class="border-gray-300 rounded-md w-full @error('socio_id') border-red-500 @enderror" required>
                                <option value="">Seleccione un socio</option>
                                @foreach ($socios as $socio)
                                    <option value="{{ $socio->id }}" {{ old('socio_id') == $socio->id ? 'selected' : '' }}>
                                        {{ $socio->nombre }} ({{ $socio->rut }})
                                    </option>
                                @endforeach
                            </select>
                            @error('socio_id')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Ejemplar:</label>
                            <select name="ejemplar_id" class="border-gray-300 rounded-md w-full @error('ejemplar_id') border-red-500 @enderror" required>
                                <option value="">Seleccione un ejemplar</option>
                                @foreach ($ejemplares as $ejemplar)
                                    <option value="{{ $ejemplar->id }}" {{ old('ejemplar_id') == $ejemplar->id ? 'selected' : '' }}>
                                        {{ $ejemplar->libro->titulo }} - Cód: {{ $ejemplar->codigo_barras }} ({{ $ejemplar->estado_fisico }})
                                    </option>
                                @endforeach
                            </select>
                            @error('ejemplar_id')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label class="block text-gray-700 font-medium mb-1">Fecha de Préstamo:</label>
                            <input type="date" name="fecha_prestamo" value="{{ old('fecha_prestamo', now()->format('Y-m-d')) }}" class="border-gray-300 rounded-md w-full @error('fecha_prestamo') border-red-500 @enderror">
                            @error('fecha_prestamo')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                            <p class="mt-1 text-sm text-gray-500">La fecha de devolución esperada se calculará automáticamente a 14 días.</p>
                        </div>

                        <div class="flex items-center space-x-3">
                            <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Registrar Préstamo
                            </button>
                            <a href="{{ route('prestamos.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Cancelar
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>