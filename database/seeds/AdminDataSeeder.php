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
            'email'     =>  'mhb236966@gmail.com',
            'password'  =>  Hash::make('mahabub&405'),
            'username'  =>  'admin',
        ]);

        // create my profile
        DB::table('profiles')->insert([
            'user_id' =>  1,
            'dob'     =>  '2000-11-22',
            'gender'  =>  'male',
            'github'  =>  'https://github.com/mahabubdev',
            'facebook'=>  'https://facebook.com/mahabub.mmm'
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
