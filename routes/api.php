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
    $data = [
        "user" => auth()->user(),
        "profile" => auth()->user()->profile()->get(),
        "palettes" => auth()->user()->pals()->get()
    ];
    return response()->json($data, 200);
});

Route::post('/login', 'API\AuthController@login')->name('login');
