<?php

namespace Database\Seeders;

use App\Models\ChurchOfficial;
use App\Models\Community;
use Illuminate\Database\Seeder;

class ChurchOfficialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Pastor Paroki
        ChurchOfficial::create([
            'name' => 'Romo Yohanes Paulus Hartono, Pr',
            'position' => 'pastor_paroki',
            'phone' => '0821-1234-5678',
            'email' => 'pastor@stpauluskwimi.org',
            'address' => 'Pastoran Gereja St. Paulus Kwimi, Kupang, NTT',
            'community_id' => null,
            'department' => null,
            'start_date' => '2020-01-01',
            'end_date' => null,
            'is_active' => true,
            'notes' => 'Pastor Paroki sejak 2020',
        ]);

        // Get communities
        $communities = Community::all();

        if ($communities->count() > 0) {
            // Create Ketua Lingkungan for each community
            foreach ($communities as $community) {
                ChurchOfficial::create([
                    'name' => fake()->name(),
                    'position' => 'ketua_lingkungan',
                    'phone' => fake()->phoneNumber(),
                    'email' => fake()->safeEmail(),
                    'address' => fake()->address(),
                    'community_id' => $community->id,
                    'department' => null,
                    'start_date' => fake()->dateTimeBetween('-2 years', 'now'),
                    'end_date' => null,
                    'is_active' => true,
                    'notes' => 'Ketua Lingkungan ' . $community->name,
                ]);

                // Create Sekretaris and Bendahara
                if (fake()->boolean(80)) {
                    ChurchOfficial::create([
                        'name' => fake()->name(),
                        'position' => 'sekretaris_lingkungan',
                        'phone' => fake()->phoneNumber(),
                        'email' => fake()->safeEmail(),
                        'community_id' => $community->id,
                        'start_date' => fake()->dateTimeBetween('-2 years', 'now'),
                        'is_active' => true,
                    ]);
                }

                if (fake()->boolean(80)) {
                    ChurchOfficial::create([
                        'name' => fake()->name(),
                        'position' => 'bendahara_lingkungan',
                        'phone' => fake()->phoneNumber(),
                        'email' => fake()->safeEmail(),
                        'community_id' => $community->id,
                        'start_date' => fake()->dateTimeBetween('-2 years', 'now'),
                        'is_active' => true,
                    ]);
                }
            }
        }

        // Create Dewan Paroki
        $dewanParokiCount = rand(5, 10);
        for ($i = 0; $i < $dewanParokiCount; $i++) {
            ChurchOfficial::create([
                'name' => fake()->name(),
                'position' => 'dewan_paroki',
                'phone' => fake()->phoneNumber(),
                'email' => fake()->safeEmail(),
                'address' => fake()->address(),
                'community_id' => $communities->isNotEmpty() ? $communities->random()->id : null,
                'department' => null,
                'start_date' => fake()->dateTimeBetween('-3 years', 'now'),
                'end_date' => null,
                'is_active' => true,
            ]);
        }

        // Create Ketua Sie (Section Leaders)
        $departments = ['Liturgi', 'Sosial', 'Kesehatan', 'Pendidikan', 'Ekonomi', 'Kepemudaan', 'Musik'];
        foreach ($departments as $department) {
            ChurchOfficial::create([
                'name' => fake()->name(),
                'position' => 'ketua_sie',
                'phone' => fake()->phoneNumber(),
                'email' => fake()->safeEmail(),
                'community_id' => $communities->isNotEmpty() ? $communities->random()->id : null,
                'department' => $department,
                'start_date' => fake()->dateTimeBetween('-2 years', 'now'),
                'is_active' => true,
                'notes' => 'Ketua Seksi ' . $department,
            ]);

            // Add some anggota sie for each department
            $membersCount = rand(2, 4);
            for ($i = 0; $i < $membersCount; $i++) {
                ChurchOfficial::create([
                    'name' => fake()->name(),
                    'position' => 'anggota_sie',
                    'phone' => fake()->boolean(70) ? fake()->phoneNumber() : null,
                    'email' => fake()->boolean(60) ? fake()->safeEmail() : null,
                    'community_id' => $communities->isNotEmpty() ? $communities->random()->id : null,
                    'department' => $department,
                    'start_date' => fake()->dateTimeBetween('-2 years', 'now'),
                    'is_active' => true,
                ]);
            }
        }

        // Create some inactive officials (former officials)
        ChurchOfficial::factory()->count(5)->inactive()->create();
    }
}
