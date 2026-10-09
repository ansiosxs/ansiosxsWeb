<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Socios') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    @if (session('success'))
                        <div class="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm" role="alert">
                            <p class="font-bold">¡Operación Exitosa!</p>
                            <p>{{ session('success') }}</p>
                        </div>
                    @endif

                    @if (session('error'))
                        <div class="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm" role="alert">
                            <p class="font-bold">Atención</p>
                            <p>{{ session('error') }}</p>
                        </div>
                    @endif

                    <div class="flex justify-between items-center mb-6">
                        <a href="{{ route('socios.create') }}" class="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded shadow transition ease-in-out duration-150 inline-block">
                            + Nuevo Socio
                        </a>

                        <form method="GET" action="{{ route('socios.index') }}" class="w-full md:w-1/3">
                            <input type="text" name="search" placeholder="Buscar por nombre, RUT o email..." value="{{ request('search') }}"
                                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        </form>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="py-2 px-4 border-b text-left">RUT</th>
                                    <th class="py-2 px-4 border-b text-left">Nombre</th>
                                    <th class="py-2 px-4 border-b text-left">Email</th>
                                    <th class="py-2 px-4 border-b text-left">Teléfono</th>
                                    <th class="py-2 px-4 border-b text-left">Comuna</th>
                                    <th class="py-2 px-4 border-b text-left">Ocupación</th>
                                    <th class="py-2 px-4 border-b text-center">Estado</th>
                                    <th class="py-2 px-4 border-b text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse ($socios as $socio)
                                <tr class="hover:bg-gray-50 transition">
                                    <td class="py-2 px-4 border-b">{{ $socio->rut }}</td>
                                    <td class="py-2 px-4 border-b font-bold">{{ $socio->nombre }}</td>
                                    <td class="py-2 px-4 border-b">{{ $socio->email ?? '-' }}</td>
                                    <td class="py-2 px-4 border-b">{{ $socio->telefono ?? '-' }}</td>
                                    <td class="py-2 px-4 border-b">{{ $socio->comuna ?? '-' }}</td>
                                    <td class="py-2 px-4 border-b">{{ $socio->ocupacion ?? '-' }}</td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <span class="px-2 py-1 text-xs font-medium rounded-full
                                            @if($socio->estado === 'Activo') bg-green-100 text-green-800
                                            @elseif($socio->estado === 'Moroso') bg-red-100 text-red-800
                                            @else bg-gray-100 text-gray-800 @endif">
                                            {{ $socio->estado }}
                                        </span>
                                    </td>
                                    <td class="py-2 px-4 border-b text-center">
                                        <div class="flex justify-center space-x-3">
                                            <a href="{{ route('socios.show', $socio) }}" class="text-blue-600 hover:text-blue-900 font-medium">Ver</a>
                                            <a href="{{ route('socios.edit', $socio) }}" class="text-yellow-600 hover:text-yellow-900 font-medium">Editar</a>
                                            <form action="{{ route('socios.destroy', $socio) }}" method="POST" class="inline"
                                                onsubmit="return confirm('¿Está seguro de eliminar este socio?')">
                                                @csrf @method('DELETE')
                                                <button type="submit" class="text-red-600 hover:text-red-900 font-medium">Eliminar</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                                @empty
                                <tr>
                                    <td colspan="8" class="py-4 px-4 text-center text-gray-500">No hay socios registrados.</td>
                                </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>

                    <div class="mt-4">
                        {{ $socios->links() }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>