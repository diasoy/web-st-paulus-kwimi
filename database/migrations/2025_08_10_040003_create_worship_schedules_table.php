<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('worship_schedules', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('pic');
            $table->time('time_start');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('worship_schedules');
    }
};
