<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Recordatorios de Vencimiento') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    <div class="flex justify-between items-center mb-6">
                        <div></div>
                        <a href="{{ route('morosidad.index') }}" class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded shadow transition duration-150">
                            Ver Morosidad
                        </a>
                    </div>

                    <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 class="text-lg font-medium text-blue-800 mb-2">Instrucciones para Envío de Recordatorios</h3>
                        <ol class="list-decimal list-inside space-y-1 text-blue-700 text-sm">
                            <li>Revise las listas de préstamos vencidos y por vencer a continuación.</li>
                            <li>Copie los datos de contacto (email/teléfono) de los socios.</li>
                            <li>Envíe recordatorios personalizados indicando: título del libro, fecha de vencimiento y días de atraso.</li>
                            <li>Marque como "Notificado" en sus registros externos una vez enviado.</li>
                        </ol>
                    </div>

                    <!-- Préstamos Vencidos -->
                    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden mb-8">
                        <div class="px-6 py-4 bg-red-50 border-b border-gray-300">
                            <h3 class="text-lg font-medium text-red-800 flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                                </svg>
                                Préstamos VENCIDOS (Fuera de Plazo)
                            </h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr class="bg-gray-100">
                                        <th class="py-2 px-4 border-b text-left">Socio</th>
                                        <th class="py-2 px-4 border-b text-left">RUT</th>
                                        <th class="py-2 px-4 border-b text-left">Ejemplar (Libro)</th>
                                        <th class="py-2 px-4 border-b text-center">Venció el</th>
                                        <th class="py-2 px-4 border-b text-center">Días de Atraso</th>
                                        <th class="py-2 px-4 border-b text-left">Contacto</th>
                                        <th class="py-2 px-4 border-b text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($vencidos as $prestamo)
                                    <tr class="bg-red-50 hover:bg-red-100 transition">
                                        <td class="py-2 px-4 border-b font-bold">{{ $prestamo->socio->nombre }}</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->socio->rut }}</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->ejemplar->libro->titulo }}<br><span class="text-sm text-gray-500">Cód: {{ $prestamo->ejemplar->codigo_barras }}</span></td>
                                        <td class="py-2 px-4 border-b text-center">{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}</td>
                                        <td class="py-2 px-4 border-b text-center text-red-600 font-bold">{{ $prestamo->fecha_devolucion_esperada->diffInDays(today()) }} día(s)</td>
                                        <td class="py-2 px-4 border-b">
                                            @if($prestamo->socio->email)
                                                <a href="mailto:{{ $prestamo->socio->email }}?subject=Recordatorio devolucion: {{ $prestamo->ejemplar->libro->titulo }}&body=Estimado {{ $prestamo->socio->nombre }},%0A%0ALe recordamos que el libro \"{{ $prestamo->ejemplar->libro->titulo }}\" (código {{ $prestamo->ejemplar->codigo_barras }}) debió devolverse el {{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}. Lleva {{ $prestamo->fecha_devolucion_esperada->diffInDays(today()) }} día(s) de atraso.%0A%0APor favor acérquese a la biblioteca a devolverlo.%0A%0ASaludos,%0ABiblioteca" class="text-blue-600 hover:underline text-sm">
                                                    {{ $prestamo->socio->email }}
                                                </a><br>
                                            @endif
                                            @if($prestamo->socio->telefono)
                                                <a href="https://wa.me/56{{ str_replace([' ', '-', '+'], '', $prestamo->socio->telefono) }}?text=Hola%20{{ urlencode($prestamo->socio->nombre) }}%2C%20le%20recordamos%20que%20el%20libro%20%22{{ urlencode($prestamo->ejemplar->libro->titulo) }}%22%20deb%C3%ADa%20devolverse%20el%20{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}.%20Lleva%20{{ $prestamo->fecha_devolucion_esperada->diffInDays(today()) }}%20d%C3%ADa(s)%20de%20atraso." target="_blank" class="text-green-600 hover:underline text-sm">
                                                    📱 {{ $prestamo->socio->telefono }}
                                                </a>
                                            @endif
                                        </td>
                                        <td class="py-2 px-4 border-b text-center">
                                            <a href="{{ route('prestamos.show', $prestamo) }}" class="text-blue-600 hover:text-blue-900 text-sm">Ver detalle</a>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="7" class="py-4 px-4 text-center text-gray-500">No hay préstamos vencidos.</td>
                                    </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Préstamos Por Vencer (48 horas) -->
                    <div class="bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <div class="px-6 py-4 bg-yellow-50 border-b border-gray-300">
                            <h3 class="text-lg font-medium text-yellow-800 flex items-center">
                                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                </svg>
                                Préstamos Por Vencer (Próximas 48 horas)
                            </h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full bg-white border border-gray-300">
                                <thead>
                                    <tr class="bg-gray-100">
                                        <th class="py-2 px-4 border-b text-left">Socio</th>
                                        <th class="py-2 px-4 border-b text-left">RUT</th>
                                        <th class="py-2 px-4 border-b text-left">Ejemplar (Libro)</th>
                                        <th class="py-2 px-4 border-b text-center">Vence el</th>
                                        <th class="py-2 px-4 border-b text-center">Días Restantes</th>
                                        <th class="py-2 px-4 border-b text-left">Contacto</th>
                                        <th class="py-2 px-4 border-b text-center">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse ($porVencer as $prestamo)
                                    <tr class="bg-yellow-50 hover:bg-yellow-100 transition">
                                        <td class="py-2 px-4 border-b font-bold">{{ $prestamo->socio->nombre }}</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->socio->rut }}</td>
                                        <td class="py-2 px-4 border-b">{{ $prestamo->ejemplar->libro->titulo }}<br><span class="text-sm text-gray-500">Cód: {{ $prestamo->ejemplar->codigo_barras }}</span></td>
                                        <td class="py-2 px-4 border-b text-center">{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}</td>
                                        <td class="py-2 px-4 border-b text-center text-yellow-600 font-bold">{{ $prestamo->diasRestantes }} día(s)</td>
                                        <td class="py-2 px-4 border-b">
                                            @if($prestamo->socio->email)
                                                <a href="mailto:{{ $prestamo->socio->email }}?subject=Pr%C3%B3ximo vencimiento: {{ $prestamo->ejemplar->libro->titulo }}&body=Estimado {{ $prestamo->socio->nombre }},%0A%0ALe recordamos que el libro \"{{ $prestamo->ejemplar->libro->titulo }}\" (código {{ $prestamo->ejemplar->codigo_barras }}) vence el {{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }} (en {{ $prestamo->diasRestantes }} día(s)).%0A%0APor favor acérquese a la biblioteca a devolverlo o renovarlo.%0A%0ASaludos,%0ABiblioteca" class="text-blue-600 hover:underline text-sm">
                                                    {{ $prestamo->socio->email }}
                                                </a><br>
                                            @endif
                                            @if($prestamo->socio->telefono)
                                                <a href="https://wa.me/56{{ str_replace([' ', '-', '+'], '', $prestamo->socio->telefono) }}?text=Hola%20{{ urlencode($prestamo->socio->nombre) }}%2C%20le%20recordamos%20que%20el%20libro%20%22{{ urlencode($prestamo->ejemplar->libro->titulo) }}%22%20vence%20el%20{{ $prestamo->fecha_devolucion_esperada->format('d/m/Y') }}%20(en%20{{ $prestamo->diasRestantes }}%20d%C3%ADa(s))." target="_blank" class="text-green-600 hover:underline text-sm">
                                                    📱 {{ $prestamo->socio->telefono }}
                                                </a>
                                            @endif
                                        </td>
                                        <td class="py-2 px-4 border-b text-center">
                                            <a href="{{ route('prestamos.show', $prestamo) }}" class="text-blue-600 hover:text-blue-900 text-sm">Ver detalle</a>
                                        </td>
                                    </tr>
                                    @empty
                                    <tr>
                                        <td colspan="7" class="py-4 px-4 text-center text-gray-500">No hay préstamos próximos a vencer.</td>
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