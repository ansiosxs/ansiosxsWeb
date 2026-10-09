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

it('requiere el rut sin puntos y con guion al crear y valida su dígito verificador', function () {
    $this->actingAs(User::factory()->create());

    $this->post(route('socios.store'), [
        'rut' => '12345678-5',
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

    foreach (['12.345.678-5', '123456785', '12345678-9'] as $rut) {
        $this->from(route('socios.create'))->post(route('socios.store'), [
            'rut' => $rut,
            'nombre' => 'RUT inválido',
            'estado' => 'Activo',
        ])->assertSessionHasErrors('rut');
    }
});

it('formatea el RUT con dígito verificador K usando guion', function () {
    $socio = Socio::create([
        'rut' => '20789754K',
        'nombre' => 'Socio con dígito K',
        'estado' => 'Activo',
    ]);

    expect($socio->rut)->toBe('20789754-K');
    $this->assertDatabaseHas('socios', ['id' => $socio->id, 'rut' => '20789754-K']);
});

it('requires the rut format when editing a socio', function () {
    $this->actingAs(User::factory()->create());
    $socio = Socio::create([
        'rut' => '12345678-5',
        'nombre' => 'Socio de prueba',
        'estado' => 'Activo',
    ]);

    foreach (['12.345.678-5', '123456785', '12345678-9'] as $rut) {
        $response = $this->from(route('socios.edit', $socio))->put(route('socios.update', $socio), [
            'rut' => $rut,
            'nombre' => 'Socio de prueba',
            'estado' => 'Activo',
        ]);

        expect($response->getSession()->has('errors'))
            ->toBeTrue("Expected invalid RUT {$rut} to fail validation.");
    }

    $this->put(route('socios.update', $socio), [
        'rut' => '12345678-5',
        'nombre' => 'Socio actualizado',
        'estado' => 'Activo',
    ])->assertRedirect(route('socios.index'))
        ->assertSessionHas('success');
});
