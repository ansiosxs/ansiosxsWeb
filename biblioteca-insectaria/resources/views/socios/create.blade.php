<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Registrar Nuevo Socio
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                
                @if ($errors->any())
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <ul class="list-disc pl-5">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('socios.store') }}" method="POST">
                    @csrf

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block font-medium text-sm text-gray-700">RUT</label>
                            <input type="text" name="rut" value="{{ old('rut') }}" placeholder="12345678-5" maxlength="10" pattern="[0-9]{7,8}-[0-9Kk]" title="Ingresa el RUT sin puntos y con guion, por ejemplo 12345678-5." required class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                            <p class="mt-1 text-xs text-gray-500">Formato obligatorio: sin puntos y con guion (ej. 12345678-5).</p>
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Nombre Completo</label>
                            <input type="text" name="nombre" value="{{ old('nombre') }}" required class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Correo Electrónico</label>
                            <input type="email" name="email" value="{{ old('email') }}" class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Teléfono</label>
                            <input type="text" name="telefono" value="{{ old('telefono') }}" class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Comuna</label>
                            <input type="text" name="comuna" value="{{ old('comuna', 'Concepción') }}" class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Ocupación</label>
                            <input type="text" name="ocupacion" value="{{ old('ocupacion') }}" class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                        </div>

                        <div>
                            <label class="block font-medium text-sm text-gray-700">Estado</label>
                            <select name="estado" class="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200">
                                <option value="Activo" {{ old('estado') == 'Activo' ? 'selected' : '' }}>Activo</option>
                                <option value="Moroso" {{ old('estado') == 'Moroso' ? 'selected' : '' }}>Moroso</option>
                                <option value="Inactivo" {{ old('estado') == 'Inactivo' ? 'selected' : '' }}>Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-6 flex justify-end gap-3">
                        <a href="{{ route('socios.index') }}" class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                            Cancelar
                        </a>
                        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar Socio
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>
</x-app-layout>