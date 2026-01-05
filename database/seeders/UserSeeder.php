<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $teacherRole = Role::firstOrCreate(['name' => 'teacher']);
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        $admin = User::create([
            'firstname' => 'System',
            'lastname' => 'Administrator',
            'middlename' => '',
            'email' => 'admin@email.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password123'),
        ]);
        $admin->assignRole($adminRole);

        $teachers = [
            [
                'firstname' => 'Rowena',
                'lastname' => 'Resposo',
                'email' => 'rowena.resposo@gmail.com',
                'username' => 'rowena',
            ],
        ];

        foreach ($teachers as $data) {
            $user = User::create(array_merge($data, [
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
            ]));
            $user->assignRole($teacherRole);
        }

        $students = [
            [
                'firstname' => 'Juan',
                'lastname' => 'Dela Cruz',
                'middlename' => 'M.',
                'email' => 'juan.delacruz@gmail.com',
                'username' => 'juan',
            ],
        ];

        foreach ($students as $data) {
            $user = User::create(array_merge($data, [
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
            ]));
            $user->assignRole($studentRole);
        }
    }
}
