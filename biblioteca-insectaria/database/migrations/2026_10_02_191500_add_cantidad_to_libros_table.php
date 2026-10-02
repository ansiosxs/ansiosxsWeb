<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('libros', function (Blueprint $table) {
            $table->unsignedInteger('cantidad')->default(0)->after('seccion');
        });

        // Conservar la información: cada fila de ejemplares pasa a ser una unidad
        // dentro del contador del libro.
        DB::statement(
            'UPDATE libros SET cantidad = (
                SELECT COUNT(*) FROM ejemplares WHERE ejemplares.libro_id = libros.id
            )'
        );
    }

    public function down(): void
    {
        Schema::table('libros', function (Blueprint $table) {
            $table->dropColumn('cantidad');
        });
    }
};
