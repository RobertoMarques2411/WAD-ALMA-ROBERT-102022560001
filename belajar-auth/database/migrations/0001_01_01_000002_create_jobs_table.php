<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->string('brand', 100);
            $table->string('category', 50);
            $table->string('supplier', 100);
            $table->string('unit', 50);
            $table->unsignedInteger('stock')->default(0);
            $table->string('status', 50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('materials');
    }
};