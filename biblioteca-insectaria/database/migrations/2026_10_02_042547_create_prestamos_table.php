<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prestamos', function (Blueprint $table) {
            $table->id();
        
            // Llaves foráneas
            $table->foreignId('socio_id')->constrained('socios')->onDelete('cascade');
            $table->foreignId('ejemplar_id')->constrained('ejemplares')->onDelete('cascade');
        
            // Fechas de control transaccional
            $table->date('fecha_prestamo');
            $table->date('fecha_devolucion_esperada');
            $table->date('fecha_devolucion_real')->nullable();
            $table->enum('estado', ['Prestado', 'Devuelto', 'Atrasado'])->default('Prestado');
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prestamos');
    }
};
