<?php

namespace Database\Seeders;

use App\Models\Community;
use Illuminate\Database\Seeder;

class CommunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $communities = [
            'Komunitas Dewasa',
            'Komunitas Remaja', 
            'Komunitas Anak',
            'Komunitas Lansia',
            'Komunitas Pelayanan',
            'Komunitas Musik',
            'Komunitas Doa'
        ];

        foreach ($communities as $communityName) {
            Community::firstOrCreate(['name' => $communityName]);
        }
    }
}
