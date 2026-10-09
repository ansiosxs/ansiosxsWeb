<?php

use App\Models\Ejemplar;
use App\Models\Libro;
use App\Models\Prestamo;
use App\Models\Socio;
use App\Models\User;
use Illuminate\Database\QueryException;
use Laravel\Sanctum\Sanctum;

beforeEach(function () {
    Sanctum::actingAs(User::factory()->create());
});

it('prevents the books API from setting quantity independently of physical copies', function () {
    $this->postJson(route('api.libros.store'), [
        'titulo' => 'Libro API',
        'autor' => 'Autor de prueba',
        'seccion' => 'Pruebas',
        'cantidad' => 3,
    ])->assertUnprocessable()
        ->assertJsonValidationErrors('cantidad');

    $libro = Libro::create([
        'titulo' => 'Libro API',
        'autor' => 'Autor de prueba',
        'seccion' => 'Pruebas',
    ]);

    $this->putJson(route('api.libros.update', $libro), [
        'titulo' => 'Libro API actualizado',
        'autor' => 'Autor de prueba',
        'seccion' => 'Pruebas',
        'cantidad' => 2,
    ])->assertUnprocessable()
        ->assertJsonValidationErrors('cantidad');

    $this->assertDatabaseHas('libros', [
        'id' => $libro->id,
        'cantidad' => 0,
    ]);
});

it('protects loan history from API deletion and database cascades', function () {
    $socio = Socio::create([
        'rut' => '12.345.678-9',
        'nombre' => 'Socio API',
        'estado' => 'Activo',
    ]);
    $libro = Libro::create([
        'titulo' => 'Libro API',
        'autor' => 'Autor de prueba',
        'seccion' => 'Pruebas',
    ]);
    $ejemplar = Ejemplar::create([
        'libro_id' => $libro->id,
        'codigo_barras' => 'API-'.uniqid(),
        'estado_fisico' => 'Bueno',
        'disponibilidad' => 'Prestado',
    ]);
    $prestamo = Prestamo::create([
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->toDateString(),
        'fecha_devolucion_esperada' => now()->addDays(7)->toDateString(),
        'estado' => 'Prestado',
    ]);

    $this->deleteJson(route('api.socios.destroy', $socio))->assertStatus(409);
    $this->deleteJson(route('api.libros.destroy', $libro))->assertStatus(409);

    expect(fn () => $socio->delete())->toThrow(QueryException::class);
    expect(fn () => $ejemplar->delete())->toThrow(QueryException::class);

    $this->assertDatabaseHas('prestamos', ['id' => $prestamo->id]);
});
