<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Gestión de Socios
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-lg font-bold text-gray-700">Lista de Socios</h3>
                    <a href="{{ route('socios.create') }}" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        + Agregar Nuevo Socio
                    </a>
                </div>

                @if (session('success'))
                    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {{ session('success') }}
                    </div>
                @endif
                @if (session('error'))
                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {{ session('error') }}
                    </div>
                @endif

                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr class="bg-gray-100 border-b">
                                <th class="py-2 px-4 border-r text-left">RUT</th>
                                <th class="py-2 px-4 border-r text-left">Nombre</th>
                                <th class="py-2 px-4 border-r text-left">Email</th>
                                <th class="py-2 px-4 border-r text-left">Teléfono</th>
                                <th class="py-2 px-4 border-r text-left">Comuna</th>
                                <th class="py-2 px-4 border-r text-left">Estado</th>
                                <th class="py-2 px-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($socios as $socio)
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="py-2 px-4 border-r">{{ $socio->rut }}</td>
                                    <td class="py-2 px-4 border-r">{{ $socio->nombre }}</td>
                                    <td class="py-2 px-4 border-r">{{ $socio->email ?? '-' }}</td>
                                    <td class="py-2 px-4 border-r">{{ $socio->telefono ?? '-' }}</td>
                                    <td class="py-2 px-4 border-r">{{ $socio->comuna }}</td>
                                    <td class="py-2 px-4 border-r">
                                        <span class="px-2 py-1 text-xs rounded font-semibold
                                            {{ $socio->estado === 'Activo' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800' }}">
                                            {{ $socio->estado }}
                                        </span>
                                    </td>
                                    <td class="py-2 px-4 text-center flex justify-center gap-2">
                                        <a href="{{ route('socios.edit', $socio->id) }}" class="text-blue-600 hover:underline">Editar</a>
    
                                        <form action="{{ route('socios.destroy', $socio->id) }}" method="POST" onsubmit="return confirm('¿Seguro que deseas eliminar este socio?');">
                                            @csrf
                                            @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:underline">Eliminar</button>
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="7" class="text-center py-4 text-gray-500">
                                        No hay socios registrados en el sistema actualmente.
                                    </td>
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
</x-app-layout>