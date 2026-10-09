<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Modificar Préstamo #{{ $prestamo->id }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">

                <form action="{{ route('prestamos.update', $prestamo->id) }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block font-medium text-sm text-gray-700">Estado del Préstamo</label>
                            <select name="estado" class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                                <option value="Prestado" {{ old('estado', $prestamo->estado) == 'Prestado' ? 'selected' : '' }}>Prestado</option>
                                <option value="Devuelto" {{ old('estado', $prestamo->estado) == 'Devuelto' ? 'selected' : '' }}>Devuelto</option>
                            </select>
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Fecha Devolución Real</label>
                            <input type="date" name="fecha_devolucion_real" value="{{ old('fecha_devolucion_real', $prestamo->fecha_devolucion_real ?? date('Y-m-d')) }}" class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end gap-3">
                        <a href="{{ route('prestamos.index') }}" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                            Cancelar
                        </a>
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar Cambios
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>