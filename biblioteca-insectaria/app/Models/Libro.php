<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Libro extends Model
{   
    protected $fillable = ['titulo', 'autor', 'seccion', 'cantidad'];

    public function ejemplares()
    {
        return $this->hasMany(Ejemplar::class);
    }

    protected function casts(): array
    {
        return [
            'cantidad' => 'integer',
        ];
    }
}
