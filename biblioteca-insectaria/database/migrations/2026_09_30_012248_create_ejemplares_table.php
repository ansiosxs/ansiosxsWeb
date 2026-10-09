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
        Schema::create('ejemplares', function (Blueprint $table) {
            $table->id();

            // Llave foránea (El "hilo" que conecta con la tabla libros)
            $table->foreignId('libro_id')->constrained('libros')->onDelete('cascade');

            // Resto de los campos del diagrama
            $table->string('codigo_barras', 50)->unique();
            $table->string('estado_fisico');
            $table->string('disponibilidad');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ejemplares');
    }
};
