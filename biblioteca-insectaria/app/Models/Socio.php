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
            set: function (string $value): string {
                $normalized = strtoupper((string) preg_replace('/[.\-\s]/', '', trim($value)));

                if (preg_match('/^(\d{1,8})([\dK])$/', $normalized, $matches) !== 1) {
                    return $normalized;
                }

                return $matches[1].'-'.$matches[2];
            },
            get: function (string $value): string {
                $normalized = strtoupper((string) preg_replace('/[.\-\s]/', '', trim($value)));

                if (preg_match('/^(\d{1,8})([\dK])$/', $normalized, $matches) !== 1) {
                    return $value;
                }

                return $matches[1].'-'.$matches[2];
            },
        );
    }

    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class);
    }

    public function prestamosActivos(): HasMany
    {
        return $this->hasMany(Prestamo::class)->whereIn('estado', Prestamo::ACTIVE_STATUSES);
    }

    public function prestamosAtrasados(): HasMany
    {
        return $this->hasMany(Prestamo::class)
            ->where(function ($query) {
                $query->where('estado', 'Atrasado')
                    ->orWhere(function ($query) {
                        $query->where('estado', 'Prestado')
                            ->where('fecha_devolucion_esperada', '<', now()->toDateString());
                    });
            });
    }

    public function prestamosVencidos(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->prestamos()
                ->where(function ($query) {
                    $query->where('estado', 'Atrasado')
                        ->orWhere(function ($query) {
                            $query->where('estado', 'Prestado')
                                ->where('fecha_devolucion_esperada', '<', now()->toDateString());
                        });
                })
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

                return $prestamos->max(fn ($p) => $p->fecha_devolucion_esperada->diffInDays(today()));
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
