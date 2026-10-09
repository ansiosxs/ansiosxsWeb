<?php

namespace App\Console\Commands;

use App\Models\Socio;
use Carbon\Carbon;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:verificar-morosidad')]
#[Description('Verifica y actualiza el estado de morosidad de los socios basado en préstamos vencidos')]
class VerificarMorosidad extends Command
{
    public function handle(): int
    {
        $hoy = Carbon::today();
        $this->info("Iniciando verificación de morosidad - {$hoy->format('d/m/Y')}");

        $sociosConPrestamosVencidos = Socio::whereHas('prestamos', function ($query) use ($hoy) {
            $query->where('estado', 'En Cursada')
                ->where('fecha_devolucion_esperada', '<', $hoy);
        })->with(['prestamos' => function ($q) use ($hoy) {
            $q->where('estado', 'En Cursada')
                ->where('fecha_devolucion_esperada', '<', $hoy)
                ->with('ejemplar.libro');
        }])->get();

        $morososActualizados = 0;
        $activadosActualizados = 0;

        foreach ($sociosConPrestamosVencidos as $socio) {
            $prestamosVencidos = $socio->prestamos->filter(fn ($p) => $p->estado === 'En Cursada' && $p->fecha_devolucion_esperada->isPast());

            if ($prestamosVencidos->isNotEmpty()) {
                if ($socio->estado !== 'Moroso') {
                    $socio->update(['estado' => 'Moroso']);
                    $morososActualizados++;
                    $this->warn("Socio pasado a MOROSO: {$socio->nombre} ({$socio->rut}) - {$prestamosVencidos->count()} préstamo(s) vencido(s)");
                }
            }
        }

        $sociosMorososSinDeuda = Socio::where('estado', 'Moroso')
            ->whereDoesntHave('prestamos', function ($query) use ($hoy) {
                $query->where('estado', 'En Cursada')
                    ->where('fecha_devolucion_esperada', '<', $hoy);
            })->get();

        foreach ($sociosMorososSinDeuda as $socio) {
            $socio->update(['estado' => 'Activo']);
            $activadosActualizados++;
            $this->info("Socio reactivado a ACTIVO: {$socio->nombre} ({$socio->rut}) - sin deudas pendientes");
        }

        $this->newLine();
        $this->info('Resumen:');
        $this->line("  - Socios pasados a Moroso: {$morososActualizados}");
        $this->line("  - Socios reactivados a Activo: {$activadosActualizados}");
        $this->line("  - Total socios con préstamos vencidos: {$sociosConPrestamosVencidos->count()}");

        return Command::SUCCESS;
    }
}
