<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ejemplar extends Model
{
    protected $table = 'ejemplares';

    protected $fillable = [
        'libro_id',
        'codigo_barras',
        'estado_fisico',
        'disponibilidad',
    ];

    public function libro()
    {
        return $this->belongsTo(Libro::class);
    }

    public function prestamos(): HasMany
    {
        return $this->hasMany(Prestamo::class);
    }

    public function prestamoActivo(): HasOne
    {
        return $this->hasOne(Prestamo::class)->whereIn('estado', Prestamo::ACTIVE_STATUSES);
    }

    public function estaDisponible(): bool
    {
        return $this->disponibilidad === 'Disponible';
    }

    public function marcarComoPrestado(): void
    {
        $this->update(['disponibilidad' => 'Prestado']);
    }

    public function marcarComoDisponible(): void
    {
        $this->update(['disponibilidad' => 'Disponible']);
    }
}
