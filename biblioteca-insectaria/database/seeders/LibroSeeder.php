<?php

namespace Database\Seeders;

use App\Models\Libro;
use Illuminate\Database\Seeder;

class LibroSeeder extends Seeder
{
    /**
     * Catálogo inicial de la Biblioteca Insectaria.
     *
     * Para cargarlo:   php artisan db:seed --class=LibroSeeder
     * Para vaciarlo:   php artisan tinker  ->  Libro::query()->delete();
     *
     * Edita la lista de abajo para cargar tus propios títulos.
     */
    public function run(): void
    {
        $libros = [
            ['titulo' => 'El Principito',                    'autor' => 'Antoine de Saint-Exupéry', 'seccion' => 'Infantil',  'cantidad' => 3],
            ['titulo' => 'Frida',                            'autor' => 'Tomás Eloy Martínez',      'seccion' => 'Infantil',  'cantidad' => 2],
            ['titulo' => 'Mobi Dick',                        'autor' => 'Herman Melville',          'seccion' => 'Ficción',   'cantidad' => 1],
            ['titulo' => 'La casa de los espíritus',         'autor' => 'Enrique Barrón',           'seccion' => 'Ficción',   'cantidad' => 4],
            ['titulo' => 'Cal comics en español',            'autor' => 'Varios autores',           'seccion' => 'Cómic',     'cantidad' => 6],
            ['titulo' => 'Manga: catálogo de iniciación',    'autor' => 'Varios autores',           'seccion' => 'Manga',     'cantidad' => 5],
            ['titulo' => 'Cuentos ilustrados',               'autor' => 'Varios autores',           'seccion' => 'Infantil',  'cantidad' => 0],
            ['titulo' => 'Flora imaginaria',                 'autor' => 'Pamela Mendoza',           'seccion' => 'Naturaleza', 'cantidad' => 2],
            ['titulo' => 'Dibujar vida silvestre',           'autor' => 'Elisa Echeverría',         'seccion' => 'Naturaleza', 'cantidad' => 1],
            ['titulo' => 'Autoficción queer',                'autor' => 'María José Suárez',        'seccion' => 'Ensayo',    'cantidad' => 3],
        ];

        foreach ($libros as $libro) {
            Libro::firstOrCreate(
                ['titulo' => $libro['titulo'], 'autor' => $libro['autor']],
                ['seccion' => $libro['seccion'], 'cantidad' => $libro['cantidad']]
            );
        }
    }
}
