<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Registrar Nuevo Préstamo
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                
                @if (session('error'))
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {{ session('error') }}
                    </div>
                @endif

                @if ($errors->any())
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <ul class="list-disc pl-5">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('prestamos.store') }}" method="POST">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block font-medium text-sm text-gray-700">Socio</label>
                            <select name="socio_id" required class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                                <option value="">Seleccione un socio...</option>
                                @foreach ($socios as $socio)
                                    <option value="{{ $socio->id }}" @selected(old('socio_id') == $socio->id)>{{ $socio->nombre }} ({{ $socio->rut }})</option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Ejemplar Disponible</label>
                            <select name="ejemplar_id" required class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                                <option value="">Seleccione un ejemplar...</option>
                                @foreach ($ejemplares as $ejemplar)
                                    <option value="{{ $ejemplar->id }}" @selected(old('ejemplar_id') == $ejemplar->id)>
                                        {{ $ejemplar->libro->titulo ?? 'Ejemplar #'.$ejemplar->id }} (Cód: {{ $ejemplar->codigo_barras }})
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Fecha de Préstamo</label>
                            <input type="date" name="fecha_prestamo" value="{{ old('fecha_prestamo', date('Y-m-d')) }}" required class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Fecha Límite Devolución</label>
                            <input type="date" 
                                name="fecha_devolucion_esperada" 
                                value="{{ old('fecha_devolucion_esperada', now()->addDays(7)->format('Y-m-d')) }}" 
                                required 
                                class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end gap-3">
                        <a href="{{ route('prestamos.index') }}" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                            Cancelar
                        </a>
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar Préstamo
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>