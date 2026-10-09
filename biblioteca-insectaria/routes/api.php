<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LibroApiController;

Route::get('/', function () {
    return response()->json([
        'name' => config('app.name') . ' API',
        'endpoints' => [
            'POST /api/login' => 'Iniciar sesión y obtener un token',
            'GET /api/me' => 'Usuario autenticado (requiere token)',
            'POST /api/logout' => 'Revocar el token actual (requiere token)',
            'GET /api/libros' => 'Listar libros (requiere token)',
            'POST /api/libros' => 'Crear libro (requiere token)',
            'GET /api/libros/{id}' => 'Ver un libro (requiere token)',
            'PUT /api/libros/{id}' => 'Actualizar libro (requiere token)',
            'DELETE /api/libros/{id}' => 'Eliminar libro (requiere token)',
        ],
    ]);
})->name('api.index');

Route::post('/login', [AuthController::class, 'login'])->name('api.login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me'])->name('api.me');
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');

    Route::apiResource('libros', LibroApiController::class)->names('api.libros');
});
