<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = auth()->user();
    $profile = auth()->user()->profile()->get();
    $pals = auth()->user()->pals()->get();
    $data = [
        "user" => $user,
        "profile" => $profile[0],
        "pals" => $pals
    ];
    return response()->json($data, 200);
});

Route::post('/login', 'API\AuthController@login')->name('login');
Route::post('/register', 'API\AuthController@register')->name('login');
