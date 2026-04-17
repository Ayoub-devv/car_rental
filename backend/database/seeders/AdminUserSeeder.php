<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@carrental.test'],
            [
                'name' => 'Rental Admin',
                'password' => 'password',
                'is_admin' => true,
            ],
        );
    }
}
