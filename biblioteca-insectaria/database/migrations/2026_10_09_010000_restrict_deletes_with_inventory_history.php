<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ejemplares', function (Blueprint $table) {
            $table->dropForeign(['libro_id']);
            $table->foreign('libro_id')->references('id')->on('libros')->restrictOnDelete();
        });

        Schema::table('prestamos', function (Blueprint $table) {
            $table->dropForeign(['socio_id']);
            $table->dropForeign(['ejemplar_id']);
            $table->foreign('socio_id')->references('id')->on('socios')->restrictOnDelete();
            $table->foreign('ejemplar_id')->references('id')->on('ejemplares')->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('prestamos', function (Blueprint $table) {
            $table->dropForeign(['socio_id']);
            $table->dropForeign(['ejemplar_id']);
            $table->foreign('socio_id')->references('id')->on('socios')->cascadeOnDelete();
            $table->foreign('ejemplar_id')->references('id')->on('ejemplares')->cascadeOnDelete();
        });

        Schema::table('ejemplares', function (Blueprint $table) {
            $table->dropForeign(['libro_id']);
            $table->foreign('libro_id')->references('id')->on('libros')->cascadeOnDelete();
        });
    }
};
