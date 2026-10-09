<?php

use App\Http\Controllers\EjemplarController;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\PrestamoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocioController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    // Rutas de Libros existentes
    Route::resource('libros', LibroController::class);

    // Rutas de Ejemplares asociados a un libro
    Route::get('/libros/{libro}/ejemplares', [EjemplarController::class, 'create'])->name('libros.ejemplares.create');
    Route::post('/libros/{libro}/ejemplares', [EjemplarController::class, 'store'])->name('libros.ejemplares.store');
    Route::delete('/ejemplares/{ejemplar}', [EjemplarController::class, 'destroy'])->name('ejemplares.destroy');
    Route::resource('socios', SocioController::class);
    Route::resource('prestamos', PrestamoController::class);

    // Ruta para devolución de préstamos
    Route::get('/prestamos/{prestamo}/devolver', [PrestamoController::class, 'devolver'])->name('prestamos.devolver');
    Route::post('/prestamos/{prestamo}/devolver', [PrestamoController::class, 'procesarDevolucion'])->name('prestamos.procesarDevolucion');

    // Rutas de Morosidad y Recordatorios
    Route::get('/morosidad', [PrestamoController::class, 'morosidad'])->name('morosidad.index');
    Route::post('/morosidad/verificar', [PrestamoController::class, 'verificarMorosidad'])->name('morosidad.verificar');
    Route::get('/prestamos/recordatorios', [PrestamoController::class, 'recordatorios'])->name('prestamos.recordatorios');
});
