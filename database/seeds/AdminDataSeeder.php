<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name'      =>  'Md Mahabub Alam',
            'email'     =>  'admin@admin.com',
            'password'  =>  Hash::make('admin123'),
            'username'  =>  'admin',
        ]);

        // create my profile
        DB::table('profiles')->insert([
            'user_id' =>  1,
            'dob'     =>  '22-11-2000',
            'gender'  =>  'male',
            'github'  =>  'https://github.com/mahabubdev/',
        ]);

        // make a demo palette
        DB::table('palettes')->insert([
            'name'      =>  'Demo Palette',
            'slug'     =>  'demo-palette',
            'description'  =>  'This is demo description',
            'user_id'  =>  1,
        ]);

        // Demo color insert
        DB::table('colors')->insert([
            'hexcode'      =>  '#4a4a4a',
            'palette_id'     =>  1,
        ]);
    }
}
