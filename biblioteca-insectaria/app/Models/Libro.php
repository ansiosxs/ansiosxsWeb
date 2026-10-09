<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Libro extends Model
{
    protected $fillable = ['titulo', 'autor', 'seccion', 'cantidad'];

    protected function casts(): array
    {
        return [
            'cantidad' => 'integer',
        ];
    }

    /**
     * Obtener los ejemplares físicos asociados a este libro.
     */
    public function ejemplares(): HasMany
    {
        return $this->hasMany(Ejemplar::class);
    }
}
