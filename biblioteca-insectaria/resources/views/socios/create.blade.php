<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Registrar Nuevo Socio') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 max-w-2xl">

                    <form method="POST" action="{{ route('socios.store') }}">
                        @csrf

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">RUN/RUT:</label>
                            <input type="text" name="rut" placeholder="12345678-9" value="{{ old('rut') }}" class="border-gray-300 rounded-md w-full @error('rut') border-red-500 @enderror" required autocomplete="off">
                            @error('rut')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                            <p class="mt-1 text-sm text-gray-500">Formato: 12345678-9 (sin puntos, con guión)</p>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Nombre Completo:</label>
                            <input type="text" name="nombre" value="{{ old('nombre') }}" class="border-gray-300 rounded-md w-full @error('nombre') border-red-500 @enderror" required autocomplete="name">
                            @error('nombre')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Correo Electrónico:</label>
                            <input type="email" name="email" value="{{ old('email') }}" class="border-gray-300 rounded-md w-full @error('email') border-red-500 @enderror" autocomplete="email">
                            @error('email')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Teléfono:</label>
                            <input type="tel" name="telefono" value="{{ old('telefono') }}" class="border-gray-300 rounded-md w-full @error('telefono') border-red-500 @enderror" autocomplete="tel">
                            @error('telefono')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-medium mb-1">Comuna:</label>
                            <input type="text" name="comuna" value="{{ old('comuna', 'Concepción') }}" class="border-gray-300 rounded-md w-full @error('comuna') border-red-500 @enderror" autocomplete="address-level2">
                            @error('comuna')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="mb-6">
                            <label class="block text-gray-700 font-medium mb-1">Ocupación:</label>
                            <input type="text" name="ocupacion" value="{{ old('ocupacion') }}" class="border-gray-300 rounded-md w-full @error('ocupacion') border-red-500 @enderror" autocomplete="off">
                            @error('ocupacion')
                                <span class="text-red-600 text-sm mt-1 block">{{ $message }}</span>
                            @enderror
                        </div>

                        <div class="flex items-center space-x-3">
                            <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Guardar Socio
                            </button>
                            <a href="{{ route('socios.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Cancelar
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>