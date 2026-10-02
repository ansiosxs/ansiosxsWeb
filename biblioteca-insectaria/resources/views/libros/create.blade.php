<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Registrar Nuevo Libro') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    
                    <form action="{{ route('libros.store') }}" method="POST">
                        @csrf

                        <!-- Título -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Título del Libro:</label>
                            <input type="text" name="titulo" value="{{ old('titulo') }}" class="border-gray-300 rounded-md w-full @error('titulo') border-red-500 @enderror" required>
                            @error('titulo')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Autor -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Autor:</label>
                            <input type="text" name="autor" value="{{ old('autor') }}" class="border-gray-300 rounded-md w-full @error('autor') border-red-500 @enderror" required>
                            @error('autor')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Sección -->
                        <div class="mb-6">
                            <label class="block text-gray-700 font-medium mb-1">Sección (Ej. Ficción, Historia):</label>
                            <input type="text" name="seccion" value="{{ old('seccion') }}" class="border-gray-300 rounded-md w-full @error('seccion') border-red-500 @enderror" required>
                            @error('seccion')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <!-- Botones de Acción -->
                        <div class="flex items-center space-x-3">
                            <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Guardar Libro
                            </button>
                            <a href="{{ route('libros.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Cancelar
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>