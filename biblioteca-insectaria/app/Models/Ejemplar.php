<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ejemplar extends Model
{
    protected $table = 'ejemplares';

    protected $fillable = [
        'libro_id',
        'codigo_barras',
        'estado_fisico',
        'disponibilidad',
    ];

    protected $casts = [
        'disponibilidad' => 'string',
    ];

    public function libro()
    {
        return $this->belongsTo(Libro::class);
    }

    public function prestamoActivo()
    {
        return $this->hasOne(Prestamo::class)->where('estado', 'En Cursada');
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
