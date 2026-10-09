<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('prestamos', function (Blueprint $table) {
            $table->enum('estado', ['En Cursada', 'Prestado', 'Devuelto', 'Atrasado'])
                ->default('En Cursada')
                ->change();
        });

        DB::table('prestamos')
            ->where('estado', 'En Cursada')
            ->update(['estado' => 'Prestado']);

        Schema::table('prestamos', function (Blueprint $table) {
            $table->enum('estado', ['Prestado', 'Devuelto', 'Atrasado'])
                ->default('Prestado')
                ->change();
        });
    }

    public function down(): void
    {
        Schema::table('prestamos', function (Blueprint $table) {
            $table->enum('estado', ['En Cursada', 'Prestado', 'Devuelto', 'Atrasado'])
                ->default('Prestado')
                ->change();
        });

        DB::table('prestamos')
            ->where('estado', 'Prestado')
            ->update(['estado' => 'En Cursada']);

        Schema::table('prestamos', function (Blueprint $table) {
            $table->enum('estado', ['En Cursada', 'Devuelto', 'Atrasado'])
                ->default('En Cursada')
                ->change();
        });
    }
};
