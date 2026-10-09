<?php

namespace App\Http\Controllers;

use App\Models\Ejemplar;
use App\Models\Prestamo;
use App\Models\Socio;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class PrestamoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $this->actualizarEstadosAtrasados();

        Ejemplar::where('disponibilidad', 'Prestado')
            ->whereDoesntHave('prestamos', function ($query) {
                $query->whereIn('estado', Prestamo::ACTIVE_STATUSES);
            })
            ->update(['disponibilidad' => 'Disponible']);

        $query = Prestamo::with(['socio', 'ejemplar.libro']);
        if ($request->filled('estado')) {
            $query->where('estado', $request->string('estado')->toString());
        }
        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($query) use ($search) {
                $query->whereHas('socio', function ($query) use ($search) {
                    $query->where('nombre', 'like', "%{$search}%")
                        ->orWhere('rut', 'like', "%{$search}%");
                })->orWhereHas('ejemplar.libro', function ($query) use ($search) {
                    $query->where('titulo', 'like', "%{$search}%");
                });
            });
        }

        $prestamos = $query->latest()->paginate(10)->withQueryString();
        if ($request->wantsJson()) {
            return response()->json($prestamos);
        }
        return view('prestamos.index', compact('prestamos'));
    }

    public function create()
    {
        $socios = Socio::where('estado', 'Activo')
            ->whereDoesntHave('prestamosAtrasados')
            ->get();
        $ejemplares = Ejemplar::with('libro')
            ->where('disponibilidad', 'Disponible')
            ->get();

        return view('prestamos.create', compact('socios', 'ejemplares'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'socio_id'                  => ['required', Rule::exists('socios', 'id')->where('estado', 'Activo')],
            'ejemplar_id'               => 'required|exists:ejemplares,id',
            'fecha_prestamo'            => 'required|date',
            'fecha_devolucion_esperada' => 'required|date|after_or_equal:fecha_prestamo',
        ]);

        $result = DB::transaction(function () use ($request) {
            $socio = Socio::findOrFail($request->socio_id);
            if (! $socio->puedeSolicitarPrestamo()) {
                return 'socio';
            }

            $claimed = Ejemplar::whereKey($request->ejemplar_id)
                ->where('disponibilidad', 'Disponible')
                ->update(['disponibilidad' => 'Prestado']);

            if ($claimed !== 1) {
                return 'ejemplar';
            }

            $prestamo = Prestamo::create([
                'socio_id'                  => $request->socio_id,
                'ejemplar_id'               => $request->ejemplar_id,
                'fecha_prestamo'            => $request->fecha_prestamo,
                'fecha_devolucion_esperada' => $request->fecha_devolucion_esperada,
                'estado'                    => 'Prestado',
            ]);

            return $request->wantsJson() ? $prestamo : 'created';
        });

        if ($result === 'socio') {
            return redirect()->back()
                ->withErrors(['socio_id' => 'El socio tiene préstamos vencidos o no está habilitado para solicitar préstamos.'])
                ->withInput();
        }

        if ($result === 'ejemplar') {
            return redirect()->back()->with('error', 'El ejemplar seleccionado ya se encuentra prestado.')->withInput();
        }

        if ($result instanceof Prestamo) {
            return response()->json($result->load(['socio', 'ejemplar.libro']), 201);
        }

        return redirect()->route('prestamos.index')->with('success', '¡Préstamo registrado correctamente!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $prestamo = Prestamo::with(['socio', 'ejemplar.libro'])->findOrFail($id);

        return view('prestamos.show', compact('prestamo'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $prestamo = Prestamo::findOrFail($id);
        $returned = $this->registrarDevolucion($prestamo, now()->toDateString());

        if (! $returned) {
            return redirect()->route('prestamos.index')
                ->with('error', 'Este préstamo ya no está activo y no se puede registrar otra devolución.');
        }

        return redirect()->route('prestamos.index')->with('success', '¡Devolución registrada y ejemplar liberado!');
    }

    public function devolver(Prestamo $prestamo)
    {
        if (! in_array($prestamo->estado, Prestamo::ACTIVE_STATUSES, true)) {
            return redirect()->route('prestamos.show', $prestamo)
                ->with('error', 'Este préstamo ya fue devuelto.');
        }

        $prestamo->load(['socio', 'ejemplar.libro']);

        return view('prestamos.devolver', compact('prestamo'));
    }

    public function procesarDevolucion(Request $request, Prestamo $prestamo)
    {
        $validated = $request->validate([
            'fecha_devolucion_real' => 'nullable|date|before_or_equal:today',
        ]);
        $fechaDevolucion = $validated['fecha_devolucion_real'] ?? now()->toDateString();

        if (! $this->registrarDevolucion($prestamo, $fechaDevolucion)) {
            return redirect()->route('prestamos.show', $prestamo)
                ->with('error', 'Este préstamo ya no está activo y no se puede registrar otra devolución.');
        }

        $this->sincronizarMorosidad($prestamo->socio);

        return redirect()->route('prestamos.show', $prestamo)
            ->with('success', '¡Devolución registrada y ejemplar liberado!');
    }

    public function morosidad()
    {
        $this->actualizarEstadosAtrasados();
        $hoy = Carbon::today();
        $limite = $hoy->copy()->addDays(2);
        $morosos = Socio::where('estado', 'Moroso')
            ->whereHas('prestamosAtrasados')
            ->with('prestamos')
            ->get();
        $proximosAVencer = Prestamo::where('estado', 'Prestado')
            ->whereBetween('fecha_devolucion_esperada', [$hoy, $limite])
            ->with(['socio', 'ejemplar.libro'])
            ->get()
            ->map(function (Prestamo $prestamo) use ($hoy) {
                $prestamo->diasRestantes = $hoy->diffInDays($prestamo->fecha_devolucion_esperada);

                return $prestamo;
            });

        return view('morosidad.index', compact('morosos', 'proximosAVencer'));
    }

    public function verificarMorosidad()
    {
        $this->actualizarEstadosAtrasados();

        return redirect()->route('morosidad.index')
            ->with('success', 'Verificación de morosidad ejecutada correctamente.');
    }

    private function sincronizarEstadosMorosidad(): void
    {
        Socio::whereHas('prestamosAtrasados')->update(['estado' => 'Moroso']);
        Socio::where('estado', 'Moroso')
            ->whereDoesntHave('prestamosAtrasados')
            ->update(['estado' => 'Activo']);
    }

    public function recordatorios()
    {
        $this->actualizarEstadosAtrasados();
        $hoy = Carbon::today();
        $limite = $hoy->copy()->addDays(2);
        $vencidos = Prestamo::where('estado', 'Atrasado')
            ->with(['socio', 'ejemplar.libro'])
            ->get();
        $porVencer = Prestamo::where('estado', 'Prestado')
            ->whereBetween('fecha_devolucion_esperada', [$hoy, $limite])
            ->with(['socio', 'ejemplar.libro'])
            ->get()
            ->map(function (Prestamo $prestamo) use ($hoy) {
                $prestamo->diasRestantes = $hoy->diffInDays($prestamo->fecha_devolucion_esperada);

                return $prestamo;
            });

        return view('prestamos.recordatorios', compact('vencidos', 'porVencer'));
    }

    private function registrarDevolucion(Prestamo $prestamo, string $fechaDevolucion): bool
    {
        return DB::transaction(function () use ($prestamo, $fechaDevolucion) {
            $updated = Prestamo::whereKey($prestamo->id)
                ->whereIn('estado', Prestamo::ACTIVE_STATUSES)
                ->update([
                    'estado' => 'Devuelto',
                    'fecha_devolucion_real' => $fechaDevolucion,
                ]);

            if ($updated !== 1) {
                return false;
            }

            Ejemplar::whereKey($prestamo->ejemplar_id)
                ->where('disponibilidad', 'Prestado')
                ->update(['disponibilidad' => 'Disponible']);

            return true;
        });
    }

    private function actualizarEstadosAtrasados(): void
    {
        Prestamo::whereIn('estado', ['Prestado', 'En Cursada'])
            ->whereDate('fecha_devolucion_esperada', '<', now()->toDateString())
            ->update(['estado' => 'Atrasado']);

        $this->sincronizarEstadosMorosidad();
    }

    private function sincronizarMorosidad(Socio $socio): void
    {
        if ($socio->prestamosAtrasados()->exists()) {
            $socio->update(['estado' => 'Moroso']);
        } elseif ($socio->estado === 'Moroso') {
            $socio->update(['estado' => 'Activo']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
