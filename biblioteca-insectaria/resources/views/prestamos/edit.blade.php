<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Editar Préstamo') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 max-w-2xl">

                    <form method="POST" action="{{ route('prestamos.update', $prestamo) }}">
                        @csrf
                        @method('PUT')

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Socio:</label>
                            <select name="socio_id" class="border-gray-300 rounded-md w-full @error('socio_id') border-red-500 @enderror" required>
                                @foreach ($socios as $socio)
                                    <option value="{{ $socio->id }}" {{ old('socio_id', $prestamo->socio_id) == $socio->id ? 'selected' : '' }}>
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
                                @foreach ($ejemplares as $ejemplar)
                                    <option value="{{ $ejemplar->id }}" {{ old('ejemplar_id', $prestamo->ejemplar_id) == $ejemplar->id ? 'selected' : '' }}>
                                        {{ $ejemplar->libro->titulo }} - Cód: {{ $ejemplar->codigo_barras }}
                                    </option>
                                @endforeach
                            </select>
                            @error('ejemplar_id')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Fecha de Préstamo:</label>
                            <input type="date" name="fecha_prestamo" value="{{ old('fecha_prestamo', $prestamo->fecha_prestamo->format('Y-m-d')) }}" class="border-gray-300 rounded-md w-full @error('fecha_prestamo') border-red-500 @enderror" required>
                            @error('fecha_prestamo')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Fecha Devolución Esperada:</label>
                            <input type="date" name="fecha_devolucion_esperada" value="{{ old('fecha_devolucion_esperada', $prestamo->fecha_devolucion_esperada->format('Y-m-d')) }}" class="border-gray-300 rounded-md w-full @error('fecha_devolucion_esperada') border-red-500 @enderror" required>
                            @error('fecha_devolucion_esperada')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Fecha Devolución Real:</label>
                            <input type="date" name="fecha_devolucion_real" value="{{ old('fecha_devolucion_real', $prestamo->fecha_devolucion_real?->format('Y-m-d')) }}" class="border-gray-300 rounded-md w-full @error('fecha_devolucion_real') border-red-500 @enderror">
                            @error('fecha_devolucion_real')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label class="block text-gray-700 font-medium mb-1">Estado:</label>
                            <select name="estado" class="border-gray-300 rounded-md w-full @error('estado') border-red-500 @enderror" required>
                                <option value="En Cursada" {{ old('estado', $prestamo->estado) === 'En Cursada' ? 'selected' : '' }}>En Curso</option>
                                <option value="Devuelto" {{ old('estado', $prestamo->estado) === 'Devuelto' ? 'selected' : '' }}>Devuelto</option>
                                <option value="Atrasado" {{ old('estado', $prestamo->estado) === 'Atrasado' ? 'selected' : '' }}>Atrasado</option>
                            </select>
                            @error('estado')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="flex items-center space-x-3">
                            <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Actualizar Préstamo
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