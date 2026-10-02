<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Socio extends Model
{
    protected $fillable = ['rut', 'nombre', 'email', 'telefono', 'comuna', 'estado'];

    // Un socio tiene muchos préstamos
    public function prestamos()
    {
        return $this->hasMany(Prestamo::class);
    }
}
