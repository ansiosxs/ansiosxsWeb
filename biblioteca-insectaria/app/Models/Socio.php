<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Socio extends Model
{
    protected $fillable = ['rut', 'nombre', 'email', 'telefono', 'comuna', 'ocupacion', 'estado'];

    protected function rut(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => strtoupper(str_replace(['.', '-'], '', $value)),
            get: fn (string $value) => $value,
        );
    }

    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class);
    }

    public function prestamosActivos(): HasMany
    {
        return $this->hasMany(Prestamo::class)->where('estado', 'En Cursada');
    }

    public function prestamosAtrasados(): HasMany
    {
        return $this->hasMany(Prestamo::class)
            ->where('estado', 'En Cursada')
            ->where('fecha_devolucion_esperada', '<', now()->toDateString());
    }

    public function prestamosVencidos(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->prestamos()
                ->where('estado', 'En Cursada')
                ->where('fecha_devolucion_esperada', '<', now()->toDateString())
                ->with('ejemplar.libro')
                ->get(),
        );
    }

    public function maxDiasAtraso(): Attribute
    {
        return Attribute::make(
            get: function () {
                $prestamos = $this->prestamosVencidos;
                if ($prestamos->isEmpty()) {
                    return 0;
                }

                return $prestamos->max(fn ($p) => $p->fecha_devolucion_esperada->diffInDays(now()));
            },
        );
    }

    public function estaMoroso(): bool
    {
        return $this->prestamosAtrasados()->exists();
    }

    public function puedeSolicitarPrestamo(): bool
    {
        return $this->estado === 'Activo' && ! $this->estaMoroso();
    }
}
