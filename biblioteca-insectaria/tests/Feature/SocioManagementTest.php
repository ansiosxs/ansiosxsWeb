<?php

use App\Models\Socio;
use App\Models\User;

it('muestra el formulario con los datos del socio a editar', function () {
    $this->actingAs(User::factory()->create());
    $socio = Socio::create([
        'rut' => '12345678-5',
        'nombre' => 'Socio de prueba',
        'estado' => 'Activo',
    ]);

    $this->get(route('socios.edit', $socio))
        ->assertOk()
        ->assertViewIs('socios.edit')
        ->assertViewHas('socio', $socio)
        ->assertSee('Socio de prueba');
});

it('actualiza un socio y permite conservar su propio rut', function () {
    $this->actingAs(User::factory()->create());
    $socio = Socio::create([
        'rut' => '12345678-5',
        'nombre' => 'Nombre anterior',
        'estado' => 'Activo',
    ]);

    $this->put(route('socios.update', $socio), [
        'rut' => $socio->rut,
        'nombre' => 'Nombre actualizado',
        'email' => 'socio@example.com',
        'telefono' => '123456789',
        'comuna' => 'Concepción',
        'estado' => 'Moroso',
    ])->assertRedirect(route('socios.index'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('socios', [
        'id' => $socio->id,
        'rut' => $socio->rut,
        'nombre' => 'Nombre actualizado',
        'estado' => 'Moroso',
    ]);
});

it('normaliza el rut, valida su dígito verificador y evita duplicados con formato distinto', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('socios.store'), [
        'rut' => '12.345.678-5',
        'nombre' => 'Socio con RUT normalizado',
        'estado' => 'Activo',
    ])->assertRedirect(route('socios.index'))
        ->assertSessionHas('success');

    $this->assertDatabaseHas('socios', ['rut' => '12345678-5']);

    $this->from(route('socios.create'))->post(route('socios.store'), [
        'rut' => '12345678-5',
        'nombre' => 'Socio duplicado',
        'estado' => 'Activo',
    ])->assertSessionHasErrors('rut');

    $this->from(route('socios.create'))->post(route('socios.store'), [
        'rut' => '12345678-9',
        'nombre' => 'RUT inválido',
        'estado' => 'Activo',
    ])->assertSessionHasErrors('rut');
});
