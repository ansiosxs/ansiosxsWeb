<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prestamo extends Model
{
    public const ACTIVE_STATUSES = ['Prestado', 'Atrasado', 'En Cursada'];

    protected function casts(): array
    {
        return [
            'fecha_prestamo' => 'date',
            'fecha_devolucion_esperada' => 'date',
            'fecha_devolucion_real' => 'date',
        ];
    }

    protected $fillable = [
        'socio_id',
        'ejemplar_id',
        'fecha_prestamo',
        'fecha_devolucion_esperada',
        'fecha_devolucion_real',
        'estado',
    ];

    public function socio()
    {
        return $this->belongsTo(Socio::class);
    }

    public function ejemplar()
    {
        return $this->belongsTo(Ejemplar::class);
    }
}
