<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // Update record lama yang belum memiliki prefix 'announcements/'
        DB::table('announcements')
            ->whereNotNull('image_url')
            ->where('image_url', '!=', '')
            ->whereRaw("image_url NOT LIKE 'announcements/%'")
            ->update([ 'image_url' => DB::raw("CONCAT('announcements/', image_url)") ]);
    }

    public function down(): void
    {
        // Rollback: hapus prefix jika ada
        DB::table('announcements')
            ->whereNotNull('image_url')
            ->where('image_url', 'like', 'announcements/%')
            ->update([ 'image_url' => DB::raw("REPLACE(image_url, 'announcements/', '')") ]);
    }
};
