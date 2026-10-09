<?php

use App\Models\Ejemplar;
use App\Models\Libro;
use App\Models\Prestamo;
use App\Models\Socio;
use App\Models\User;

function crearEjemplarDisponible(): array
{
    $socio = Socio::create([
        'rut' => '12.345.678-9',
        'nombre' => 'Socio de prueba',
        'estado' => 'Activo',
    ]);

    $libro = Libro::create([
        'titulo' => 'Libro de prueba',
        'autor' => 'Autor de prueba',
        'seccion' => 'Pruebas',
    ]);

    $ejemplar = Ejemplar::create([
        'libro_id' => $libro->id,
        'codigo_barras' => 'TEST-'.uniqid(),
        'estado_fisico' => 'Bueno',
        'disponibilidad' => 'Disponible',
    ]);

    return [$socio, $libro, $ejemplar];
}

it('registra el préstamo y cambia la disponibilidad del ejemplar en conjunto', function () {
    $this->actingAs(User::factory()->create());
    [$socio, , $ejemplar] = crearEjemplarDisponible();

    $response = $this->post(route('prestamos.store'), [
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->toDateString(),
        'fecha_devolucion_esperada' => now()->addDays(7)->toDateString(),
    ]);

    $response->assertRedirect(route('prestamos.index'));
    $this->assertDatabaseHas('prestamos', [
        'ejemplar_id' => $ejemplar->id,
        'estado' => 'Prestado',
    ]);
    $this->assertDatabaseHas('ejemplares', [
        'id' => $ejemplar->id,
        'disponibilidad' => 'Prestado',
    ]);

    $this->post(route('prestamos.store'), [
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->toDateString(),
        'fecha_devolucion_esperada' => now()->addDays(7)->toDateString(),
    ])->assertSessionHas('error');

    expect(Prestamo::where('ejemplar_id', $ejemplar->id)->count())->toBe(1);
});

it('mantiene la cantidad del libro sincronizada al registrar y eliminar ejemplares sin historial', function () {
    $this->actingAs(User::factory()->create());
    $libro = Libro::create([
        'titulo' => 'Libro de inventario',
        'autor' => 'Autor de prueba',
        'seccion' => 'Pruebas',
    ]);

    $this->post(route('libros.ejemplares.store', $libro), [
        'codigo_barras' => 'INVENTARIO-1',
        'estado_fisico' => 'Bueno',
        'disponibilidad' => 'Disponible',
    ])->assertRedirect(route('libros.ejemplares.create', $libro));

    $ejemplar = Ejemplar::where('codigo_barras', 'INVENTARIO-1')->firstOrFail();
    $this->assertDatabaseHas('libros', ['id' => $libro->id, 'cantidad' => 1]);

    $this->delete(route('ejemplares.destroy', $ejemplar))
        ->assertRedirect(route('libros.ejemplares.create', $libro));
    $this->assertDatabaseHas('libros', ['id' => $libro->id, 'cantidad' => 0]);
});

it('marca vencidos los préstamos atrasados y permite devolverlos una sola vez', function () {
    $this->actingAs(User::factory()->create());
    [$socio, , $ejemplar] = crearEjemplarDisponible();
    $ejemplar->update(['disponibilidad' => 'Prestado']);
    $prestamo = Prestamo::create([
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->subDays(10)->toDateString(),
        'fecha_devolucion_esperada' => now()->subDay()->toDateString(),
        'estado' => 'Prestado',
    ]);

    $this->get(route('prestamos.index'));

    $this->assertDatabaseHas('prestamos', [
        'id' => $prestamo->id,
        'estado' => 'Atrasado',
    ]);

    $this->put(route('prestamos.update', $prestamo))->assertRedirect(route('prestamos.index'));
    $this->assertDatabaseHas('prestamos', [
        'id' => $prestamo->id,
        'estado' => 'Devuelto',
    ]);
    $this->assertDatabaseHas('ejemplares', [
        'id' => $ejemplar->id,
        'disponibilidad' => 'Disponible',
    ]);

    $this->put(route('prestamos.update', $prestamo))
        ->assertSessionHas('error');
});

it('conserva préstamos antiguos como activos mientras la migración de estado está pendiente', function () {
    $this->actingAs(User::factory()->create());
    [$socio, , $ejemplar] = crearEjemplarDisponible();
    $ejemplar->update(['disponibilidad' => 'Prestado']);
    $prestamo = Prestamo::create([
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->toDateString(),
        'fecha_devolucion_esperada' => now()->addDays(7)->toDateString(),
        'estado' => 'En Cursada',
    ]);

    $this->get(route('prestamos.index'))->assertOk();

    $this->assertDatabaseHas('ejemplares', [
        'id' => $ejemplar->id,
        'disponibilidad' => 'Prestado',
    ]);

    $this->post(route('prestamos.procesarDevolucion', $prestamo))
        ->assertRedirect(route('prestamos.show', $prestamo));

    $this->assertDatabaseHas('prestamos', [
        'id' => $prestamo->id,
        'estado' => 'Devuelto',
    ]);
    $this->assertDatabaseHas('ejemplares', [
        'id' => $ejemplar->id,
        'disponibilidad' => 'Disponible',
    ]);
});

it('repara ejemplares atascados como prestados si todos sus préstamos ya fueron devueltos', function () {
    $this->actingAs(User::factory()->create());
    [$socio, , $ejemplar] = crearEjemplarDisponible();
    $ejemplar->update(['disponibilidad' => 'Prestado']);
    Prestamo::create([
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->subDays(10)->toDateString(),
        'fecha_devolucion_esperada' => now()->subDays(3)->toDateString(),
        'fecha_devolucion_real' => now()->subDays(2)->toDateString(),
        'estado' => 'Devuelto',
    ]);

    $this->get(route('prestamos.index'))->assertOk();

    $this->assertDatabaseHas('ejemplares', [
        'id' => $ejemplar->id,
        'disponibilidad' => 'Disponible',
    ]);
    $this->assertDatabaseHas('prestamos', [
        'ejemplar_id' => $ejemplar->id,
        'estado' => 'Devuelto',
    ]);
});

it('bloquea préstamos y borrados que pondrían en riesgo el inventario o el historial', function () {
    $this->actingAs(User::factory()->create());
    [$socio, $libro, $ejemplar] = crearEjemplarDisponible();
    $socio->update(['estado' => 'Inactivo']);

    $this->post(route('prestamos.store'), [
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->toDateString(),
        'fecha_devolucion_esperada' => now()->addDays(7)->toDateString(),
    ])->assertSessionHasErrors('socio_id');

    $socio->update(['estado' => 'Activo']);
    $prestamo = Prestamo::create([
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->toDateString(),
        'fecha_devolucion_esperada' => now()->addDays(7)->toDateString(),
        'estado' => 'Prestado',
    ]);

    $this->delete(route('ejemplares.destroy', $ejemplar))->assertSessionHas('error');
    $this->delete(route('libros.destroy', $libro))->assertSessionHas('error');
    $this->delete(route('socios.destroy', $socio))->assertSessionHas('error');

    $this->assertDatabaseHas('prestamos', ['id' => $prestamo->id]);
    $this->assertDatabaseHas('ejemplares', ['id' => $ejemplar->id]);
    $this->assertDatabaseHas('libros', ['id' => $libro->id]);
    $this->assertDatabaseHas('socios', ['id' => $socio->id]);
});

it('permite registrar ejemplares en mantención pero no prestarlos', function () {
    $this->actingAs(User::factory()->create());
    $socio = Socio::create([
        'rut' => '98.765.432-1',
        'nombre' => 'Socio activo',
        'estado' => 'Activo',
    ]);
    $libro = Libro::create([
        'titulo' => 'Libro en mantención',
        'autor' => 'Autor de prueba',
        'seccion' => 'Pruebas',
    ]);

    $this->post(route('libros.ejemplares.store', $libro), [
        'codigo_barras' => 'MANTENCION-1',
        'estado_fisico' => 'Dañado',
        'disponibilidad' => 'En Mantención',
    ])->assertRedirect(route('libros.ejemplares.create', $libro));

    $ejemplar = Ejemplar::where('codigo_barras', 'MANTENCION-1')->firstOrFail();

    $this->get(route('prestamos.create'))->assertDontSee('MANTENCION-1');
    $this->post(route('prestamos.store'), [
        'socio_id' => $socio->id,
        'ejemplar_id' => $ejemplar->id,
        'fecha_prestamo' => now()->toDateString(),
        'fecha_devolucion_esperada' => now()->addDays(7)->toDateString(),
    ])->assertSessionHas('error');

    $this->assertDatabaseMissing('prestamos', ['ejemplar_id' => $ejemplar->id]);
});
