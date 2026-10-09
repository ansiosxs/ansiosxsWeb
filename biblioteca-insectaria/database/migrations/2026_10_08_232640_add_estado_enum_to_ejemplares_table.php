<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ejemplares', function (Blueprint $table) {
            $table->enum('disponibilidad', ['Disponible', 'Prestado', 'Mantenimiento', 'Extraviado'])
                ->default('Disponible')
                ->change();
        });
    }

    public function down(): void
    {
        Schema::table('ejemplares', function (Blueprint $table) {
            $table->string('disponibilidad')->change();
        });
    }
};
