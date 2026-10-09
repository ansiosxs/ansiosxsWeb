<?php

namespace App\Http\Controllers;

use App\Http\Requests\PrestamoStoreRequest;
use App\Models\Ejemplar;
use App\Models\Prestamo;
use App\Models\Socio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PrestamoController extends Controller
{
    public function index(Request $request)
    {
        $query = Prestamo::with(['socio', 'ejemplar.libro']);

        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('socio', function ($q) use ($search) {
                $q->where('nombre', 'like', "%{$search}%")
                    ->orWhere('rut', 'like', "%{$search}%");
            })->orWhereHas('ejemplar.libro', function ($q) use ($search) {
                $q->where('titulo', 'like', "%{$search}%");
            });
        }

        $prestamos = $query->latest()->paginate(10);

        if ($request->wantsJson()) {
            return response()->json($prestamos);
        }

        return view('prestamos.index', compact('prestamos'));
    }

    public function create()
    {
        $socios = Socio::where('estado', 'Activo')->whereDoesntHave('prestamosAtrasados')->get();
        $ejemplares = Ejemplar::where('disponibilidad', 'Disponible')->with('libro')->get();

        return view('prestamos.create', compact('socios', 'ejemplares'));
    }

    public function store(PrestamoStoreRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $socio = Socio::findOrFail($request->socio_id);

            if (! $socio->puedeSolicitarPrestamo()) {
                $message = $socio->estado === 'Moroso'
                    ? 'El socio se encuentra en estado moroso y no puede solicitar préstamos.'
                    : 'El socio tiene devoluciones pendientes y no puede solicitar nuevos préstamos.';

                if ($request->wantsJson()) {
                    return response()->json(['error' => $message], 422);
                }

                return back()->withErrors(['socio_id' => $message])->withInput();
            }

            $ejemplar = Ejemplar::where('id', $request->ejemplar_id)
                ->where('disponibilidad', 'Disponible')
                ->lockForUpdate()
                ->first();

            if (! $ejemplar) {
                $message = 'El ejemplar no está disponible para préstamo.';

                if ($request->wantsJson()) {
                    return response()->json(['error' => $message], 422);
                }

                return back()->withErrors(['ejemplar_id' => $message])->withInput();
            }

            $fechaPrestamo = $request->fecha_prestamo ? Carbon::parse($request->fecha_prestamo) : Carbon::today();
            $fechaDevolucionEsperada = $fechaPrestamo->copy()->addDays(14);

            $prestamo = Prestamo::create([
                'socio_id' => $socio->id,
                'ejemplar_id' => $ejemplar->id,
                'fecha_prestamo' => $fechaPrestamo,
                'fecha_devolucion_esperada' => $fechaDevolucionEsperada,
                'estado' => 'En Cursada',
            ]);

            $ejemplar->marcarComoPrestado();

            if ($request->wantsJson()) {
                return response()->json($prestamo->load(['socio', 'ejemplar.libro']), 201);
            }

            return redirect()->route('prestamos.index')->with('success', '¡Préstamo registrado exitosamente! Fecha de devolución: '.$fechaDevolucionEsperada->format('d/m/Y'));
        });
    }

    public function show(Prestamo $prestamo, Request $request)
    {
        $prestamo->load(['socio', 'ejemplar.libro']);

        if ($request->wantsJson()) {
            return response()->json($prestamo);
        }

        return view('prestamos.show', compact('prestamo'));
    }

    public function devolver(Prestamo $prestamo)
    {
        if ($prestamo->estado !== 'En Cursada') {
            return redirect()->route('prestamos.show', $prestamo)
                ->with('error', 'Este préstamo ya ha sido devuelto o cancelado.');
        }

        return view('prestamos.devolver', compact('prestamo'));
    }

    public function procesarDevolucion(Request $request, Prestamo $prestamo)
    {
        return DB::transaction(function () use ($request, $prestamo) {
            if ($prestamo->estado !== 'En Cursada') {
                $message = 'Este préstamo ya ha sido devuelto o cancelado.';

                if ($request->wantsJson()) {
                    return response()->json(['error' => $message], 422);
                }

                return redirect()->route('prestamos.show', $prestamo)->with('error', $message);
            }

            $fechaDevolucionReal = $request->fecha_devolucion_real ? Carbon::parse($request->fecha_devolucion_real) : Carbon::today();
            $estaAtrasado = $fechaDevolucionReal->gt($prestamo->fecha_devolucion_esperada);

            $prestamo->update([
                'fecha_devolucion_real' => $fechaDevolucionReal,
                'estado' => 'Devuelto',
            ]);

            $prestamo->ejemplar->marcarComoDisponible();

            if ($estaAtrasado) {
                $this->verificarMorosidadSocio($prestamo->socio);
            }

            $message = '¡Devolución registrada exitosamente!';
            if ($estaAtrasado) {
                $diasAtraso = $prestamo->fecha_devolucion_esperada->diffInDays($fechaDevolucionReal);
                $message .= " ⚠ Devolución tardía: {$diasAtraso} día(s) de atraso.";
            }

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => $message,
                    'prestamo' => $prestamo->load(['socio', 'ejemplar.libro']),
                    'atrasado' => $estaAtrasado,
                ]);
            }

            return redirect()->route('prestamos.index')->with('success', $message);
        });
    }

    private function verificarMorosidadSocio(Socio $socio): void
    {
        $tieneAtrasados = $socio->prestamosAtrasados()->exists();

        if ($tieneAtrasados && $socio->estado !== 'Moroso') {
            $socio->update(['estado' => 'Moroso']);
        } elseif (! $tieneAtrasados && $socio->estado === 'Moroso') {
            $socio->update(['estado' => 'Activo']);
        }
    }

    public function morosidad()
    {
        $hoy = Carbon::today();
        $en48Horas = $hoy->copy()->addDays(2);

        $morosos = Socio::where('estado', 'Moroso')
            ->with(['prestamosVencidos.ejemplar.libro'])
            ->get();

        $proximosAVencer = Prestamo::where('estado', 'En Cursada')
            ->where('fecha_devolucion_esperada', '<=', $en48Horas)
            ->where('fecha_devolucion_esperada', '>=', $hoy)
            ->with(['socio', 'ejemplar.libro'])
            ->get()
            ->map(function ($prestamo) {
                $prestamo->diasRestantes = $prestamo->fecha_devolucion_esperada->diffInDays($hoy) + 1;

                return $prestamo;
            });

        return view('morosidad.index', compact('morosos', 'proximosAVencer'));
    }

    public function verificarMorosidad(Request $request)
    {
        $this->verificarMorosidadCommand();

        return redirect()->route('morosidad.index')->with('success', 'Verificación de morosidad ejecutada correctamente.');
    }

    private function verificarMorosidadCommand(): void
    {
        $hoy = Carbon::today();

        $sociosConPrestamosVencidos = Socio::whereHas('prestamos', function ($query) use ($hoy) {
            $query->where('estado', 'En Cursada')
                ->where('fecha_devolucion_esperada', '<', $hoy);
        })->get();

        foreach ($sociosConPrestamosVencidos as $socio) {
            if ($socio->estado !== 'Moroso') {
                $socio->update(['estado' => 'Moroso']);
            }
        }

        $sociosMorososSinDeuda = Socio::where('estado', 'Moroso')
            ->whereDoesntHave('prestamos', function ($query) use ($hoy) {
                $query->where('estado', 'En Cursada')
                    ->where('fecha_devolucion_esperada', '<', $hoy);
            })->get();

        foreach ($sociosMorososSinDeuda as $socio) {
            $socio->update(['estado' => 'Activo']);
        }
    }

    public function recordatorios()
    {
        $hoy = Carbon::today();
        $en48Horas = $hoy->copy()->addDays(2);

        $vencidos = Prestamo::where('estado', 'En Cursada')
            ->where('fecha_devolucion_esperada', '<', $hoy)
            ->with(['socio', 'ejemplar.libro'])
            ->get();

        $porVencer = Prestamo::where('estado', 'En Cursada')
            ->where('fecha_devolucion_esperada', '<=', $en48Horas)
            ->where('fecha_devolucion_esperada', '>=', $hoy)
            ->with(['socio', 'ejemplar.libro'])
            ->get()
            ->map(function ($prestamo) use ($hoy) {
                $prestamo->diasRestantes = $prestamo->fecha_devolucion_esperada->diffInDays($hoy) + 1;

                return $prestamo;
            });

        return view('prestamos.recordatorios', compact('vencidos', 'porVencer'));
    }

    public function edit(Prestamo $prestamo)
    {
        $socios = Socio::where('estado', 'Activo')->get();
        $ejemplares = Ejemplar::with('libro')->get();

        return view('prestamos.edit', compact('prestamo', 'socios', 'ejemplares'));
    }

    public function update(Request $request, Prestamo $prestamo)
    {
        $request->validate([
            'socio_id' => 'required|exists:socios,id',
            'ejemplar_id' => 'required|exists:ejemplares,id',
            'fecha_prestamo' => 'required|date',
            'fecha_devolucion_esperada' => 'required|date|after_or_equal:fecha_prestamo',
            'fecha_devolucion_real' => 'nullable|date',
            'estado' => 'required|in:En Cursada,Devuelto,Atrasado',
        ]);

        $prestamo->update($request->all());

        if ($request->wantsJson()) {
            return response()->json($prestamo);
        }

        return redirect()->route('prestamos.index')->with('success', '¡Préstamo actualizado exitosamente!');
    }

    public function destroy(Prestamo $prestamo, Request $request)
    {
        if ($prestamo->estado === 'En Cursada') {
            $prestamo->ejemplar->marcarComoDisponible();
        }

        $prestamo->delete();

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Préstamo eliminado correctamente']);
        }

        return redirect()->route('prestamos.index')->with('success', '¡Préstamo eliminado exitosamente!');
    }
}
