<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\EjemplarController;

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
});