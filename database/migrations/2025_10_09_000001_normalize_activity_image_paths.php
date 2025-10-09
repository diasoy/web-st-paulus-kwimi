<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Update record lama yang belum memiliki prefix 'activities/'
        DB::table('activities')
            ->whereNotNull('image_url')
            ->where('image_url', '!=', '')
            ->whereRaw("image_url NOT LIKE 'activities/%'")
            ->update([ 'image_url' => DB::raw("CONCAT('activities/', image_url)") ]);
    }

    public function down(): void
    {
        // Rollback: hapus prefix jika ada
        DB::table('activities')
            ->whereNotNull('image_url')
            ->where('image_url', 'like', 'activities/%')
            ->update([ 'image_url' => DB::raw("REPLACE(image_url, 'activities/', '')") ]);
    }
};