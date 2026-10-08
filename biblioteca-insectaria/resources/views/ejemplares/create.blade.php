<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Gestión de Ejemplares - <span class="text-blue-600">{{ $libro->titulo }}</span>
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            
            <!-- Tarjeta 1: Formulario de Registro por Escáner -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-bold mb-4 text-gray-800">Registrar Copia Física (Escanear Código)</h3>

                <!-- Mensajes Flash -->
                @if (session('success'))
                    <div class="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                        {{ session('success') }}
                    </div>
                @endif

                @if ($errors->any())
                    <div class="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <ul class="list-disc list-inside">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                <form action="{{ route('libros.ejemplares.store', $libro->id) }}" method="POST">
                    @csrf
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        
                        <!-- Campo Código de Barras (Auto-Focus para el Lector USB) -->
                        <div>
                            <label class="block text-gray-700 font-medium mb-1">Código de Barras / ISBN:</label>
                            <input type="text" id="codigo_barras" name="codigo_barras" 
                                   class="border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500" 
                                   placeholder="Escanea con el lector USB..." autofocus required>
                        </div>

                        <!-- Estado Físico -->
                        <div>
                            <label class="block text-gray-700 font-medium mb-1">Estado Físico:</label>
                            <select name="estado_fisico" class="border-gray-300 rounded-md w-full">
                                <option value="Bueno">Bueno</option>
                                <option value="Regular">Regular</option>
                                <option value="Dañado">Dañado</option>
                            </select>
                        </div>

                        <!-- Disponibilidad -->
                        <div>
                            <label class="block text-gray-700 font-medium mb-1">Disponibilidad Inicial:</label>
                            <select name="disponibilidad" class="border-gray-300 rounded-md w-full">
                                <option value="Disponible">Disponible</option>
                                <option value="En Mantención">En Mantención</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex items-center space-x-3">
                        <button type="submit" class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
                            + Registrar Ejemplar
                        </button>
                        <a href="{{ route('libros.index') }}" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Volver al Inventario
                        </a>
                    </div>
                </form>
            </div>

            <!-- Tarjeta 2: Lista de Ejemplares Existentes de este Libro -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-bold mb-4 text-gray-800">Ejemplares Registrados ({{ $libro->ejemplares->count() }})</h3>
                
                <table class="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="py-2 px-4 border-b text-left">Código de Barras</th>
                            <th class="py-2 px-4 border-b text-left">Estado Físico</th>
                            <th class="py-2 px-4 border-b text-left">Disponibilidad</th>
                            <th class="py-2 px-4 border-b text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse ($libro->ejemplares as $ejemplar)
                            <tr>
                                <td class="py-2 px-4 border-b font-mono font-bold">{{ $ejemplar->codigo_barras }}</td>
                                <td class="py-2 px-4 border-b">{{ $ejemplar->estado_fisico }}</td>
                                <td class="py-2 px-4 border-b">
                                    <span class="px-2 py-1 rounded text-xs font-bold {{ $ejemplar->disponibilidad == 'Disponible' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800' }}">
                                        {{ $ejemplar->disponibilidad }}
                                    </span>
                                </td>
                                <td class="py-2 px-4 border-b text-center">
                                    <form action="{{ route('ejemplares.destroy', $ejemplar->id) }}" method="POST" onsubmit="return confirm('¿Eliminar este ejemplar?');">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-900 font-medium">Eliminar</button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4" class="py-4 text-center text-gray-500">Este libro aún no tiene copias físicas/ejemplares registrados.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    <!-- Script Event Listener para el Escáner HID (Autofocus + Interceptación de ráfaga y Enter) -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const inputCodigo = document.getElementById('codigo_barras');
            const form = inputCodigo ? inputCodigo.closest('form') : null;

            if (!inputCodigo || !form) {
                return;
            }

            // Mantener el foco automático reactivo en el campo del escáner
            inputCodigo.addEventListener('blur', function () {
                // Restaurar el foco cuando el usuario no está interactuando manualmente
                if (!escaneando) {
                    setTimeout(function () { inputCodigo.focus(); }, 100);
                }
            });

            // Variables para reconstruir la ráfaga de datos del escáner HID
            let buffer = '';
            let ultimaTecla = 0;
            let escaneando = false;

            inputCodigo.addEventListener('keydown', function (e) {
                // Detectar la ráfaga rápida del escáner: teclas con intervalo < 20ms
                const ahora = Date.now();
                if (ahora - ultimaTecla < 20 && e.key !== 'Backspace' && e.key !== 'Delete') {
                    escaneando = true;
                }
                ultimaTecla = ahora;

                // El escáner envía un Enter automático al terminar de escanear
                if (e.key === 'Enter') {
                    if (escaneando) {
                        // Prevenir el submit prematuro del formulario
                        e.preventDefault();
                        e.stopPropagation();

                        // Limpiar el buffer y enfocar el campo para la siguiente lectura
                        buffer = '';
                        escaneando = false;
                        inputCodigo.focus();
                        return;
                    }
                    // Si no es un escaneo, permitir el submit normal
                }
            });

            inputCodigo.addEventListener('input', function () {
                // Durante la ráfaga del escáner, no permitir edición manual
                if (escaneando) {
                    buffer = inputCodigo.value;
                }
            });

            // Validación frontend: impedir envío si el código ya fue escaneado previamente
            form.addEventListener('submit', function (e) {
                const codigo = inputCodigo.value.trim();
                if (codigo === '') {
                    e.preventDefault();
                    alert('Debes ingresar o escanear un código de barras.');
                    inputCodigo.focus();
                    return;
                }
            });
        });
    </script>
</x-app-layout>