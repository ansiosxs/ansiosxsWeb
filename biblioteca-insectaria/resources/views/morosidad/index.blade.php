<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Gestión de Morosidad') }}
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

                    <div class="mb-4">
                        <form method="POST" action="{{ route('morosidad.verificar') }}" class="inline">
                            @csrf
                            <button type="submit" class="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                                Ejecutar Verificación Manual
                            </button>
                        </form>
                    </div>

                    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden mb-8">
                        <div class="px-6 py-4 bg-red-50 border-b border-gray-300">
                            <h3 class="text-lg font-medium text-red-800">Socios en Estado Moroso</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr class="bg-gray-100">
                                        <th class="py-2 px-4 border-b text-left">Socio</th>
                                        <th class="py-2 px-4 border-b text-left">RUT</th>
                                        <th class="py-2 px-4 border-b text-left">Contacto</th>
                                        <th class="py-2 px-4 border-b text-left">Préstamos Vencidos</th>
                                        <th class="py-2 px-4 border-b text-center">Días Máx. Atraso</th>
                                        <th class="py-2 px-4 border-b text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($morosos as $socio)
                                    <tr class="hover:bg-gray-50 transition">
                                        <td class="py-2 px-4 border-b font-bold">{{ $socio->nombre }}</td>
                                        <td class="py-2 px-4 border-b">{{ $socio->rut }}</td>
                                        <td class="py-2 px-4 border-b">
                                            @if($socio->email) {{ $socio->email }}<br> @endif
                                            @if($socio->telefono) {{ $socio->telefono }} @endif
                                        </td>
                                        <td class="py-2 px-4 border-b">
                                            <ul class="text-sm">
                                                @foreach($socio->prestamosVencidos as $prestamo)
                                                    <li>{{ $prestamo->ejemplar->libro->titulo }} (venció {{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }})</li>
                                                @endforeach
                                            </ul>
                                        </td>
                                        <td class="py-2 px-4 border-b text-center text-red-600 font-bold">{{ $socio->maxDiasAtraso }} día(s)</td>
                                        <td class="py-2 px-4 border-b text-center">
                                            <div class="flex justify-center space-x-3">
                                                <a href="{{ route('socios.show', $socio) }}" class="text-blue-600 hover:text-blue-900 font-medium">Ver Socio</a>
                                                <span class="text-gray-400 cursor-not-allowed" title="Bloqueado por morosidad">Nuevo Préstamo (Bloqueado)</span>
                                            </div>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="6" class="py-4 px-4 text-center text-gray-500">No hay socios en estado moroso.</td>
                                    </tr>
                                    @endforelse
                            </table>
                        </div>
                    </div>

                    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <div class="px-6 py-4 bg-yellow-50 border-b border-gray-300">
                            <h3 class="text-lg font-medium text-yellow-800">Préstamos Próximos a Vencer (48 horas)</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr class="bg-gray-100">
                                        <th class="py-2 px-4 border-b text-left">Socio</th>
                                        <th class="py-2 px-4 border-b text-left">Ejemplar</th>
                                        <th class="py-2 px-4 border-b text-center">Vence el</th>
                                        <th class="py-2 px-4 border-b text-center">Días Restantes</th>
                                        <th class="py-2 px-4 border-b text-left">Contacto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($proximosAVencer as $prestamo)
                                    <tr class="bg-yellow-50 hover:bg-yellow-100 transition">
                                        <td class="py-2 px-4 border-b">{{ $prestamo->socio->nombre }}</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->ejemplar->libro->titulo }}</td>
                                        <td class="py-2 px-4 border-b text-center">{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}</td>
                                        <td class="py-2 px-4 border-b text-center text-yellow-600 font-bold">{{ $prestamo->diasRestantes }} día(s)</td>
                                        <td class="py-2 px-4 border-b">
                                            @if($prestamo->socio->email) {{ $prestamo->socio->email }}<br> @endif
                                            @if($prestamo->socio->telefono) {{ $prestamo->socio->telefono }} @endif
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="5" class="py-4 px-4 text-center text-gray-500">No hay préstamos próximos a vencer.</td>
                                    </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</x-app-layout>