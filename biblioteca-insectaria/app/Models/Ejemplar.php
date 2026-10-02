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

    // Un ejemplar pertenece a un libro
    public function libro()
    {
        return $this->belongsTo(Libro::class);
    }
}
