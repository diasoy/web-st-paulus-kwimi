<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('church_officials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('position', [
                'pastor_paroki',
                'ketua_lingkungan',
                'sekretaris_lingkungan',
                'bendahara_lingkungan',
                'koordinator_wilayah',
                'dewan_paroki',
                'ketua_sie',
                'anggota_sie'
            ]);
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('photo')->nullable();
            $table->foreignId('community_id')->nullable()->constrained('communities')->onDelete('set null');
            $table->string('department')->nullable(); // Seksi: Liturgi, Sosial, dll
            $table->date('start_date')->nullable(); // Tanggal mulai menjabat
            $table->date('end_date')->nullable(); // Tanggal selesai menjabat
            $table->boolean('is_active')->default(true);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('church_officials');
    }
};
