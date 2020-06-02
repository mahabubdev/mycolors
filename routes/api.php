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
/*
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
}); */

Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    $user = auth()->user();
    $profile = auth()->user()->profile()->get();
    $data = [
        "user" => $user,
        "profile" => $profile,
    ];
    return response()->json($data, 200);
});

// authentications
Route::post('/login', 'API\AuthController@login')->name('login');
Route::post('/register', 'API\AuthController@register')->name('register');
Route::post('/forget', 'API\VerifyController@sendEmail')->name('user.forget');
Route::put('/forget', 'API\VerifyController@resetPassword')->name('user.reset');
Route::middleware('auth:sanctum')->post('/logout', 'API\AuthController@logout')->name('user.logout');

// statistics
Route::middleware('auth:sanctum')->get('/get/adminst', 'API\StatisticsController@getAdminSt')->name('st.admin');
Route::middleware('auth:sanctum')->get('/get/userst', 'API\StatisticsController@getUserSt')->name('st.users');


//profile
Route::middleware('auth:sanctum')->put('/profile/edit', 'API\AuthController@editProfile')->name('user.edit');
Route::middleware('auth:sanctum')->post('/profile/photo', 'API\AuthController@editPhoto')->name('user.photo');

//palette
Route::middleware('auth:sanctum')->get('/get/pals', 'API\PaletteController@getPals')->name('pal.get');
Route::middleware('auth:sanctum')->get('/pal/{slug}', 'API\PaletteController@palPage')->name('pal.page');
Route::middleware('auth:sanctum')->post('/pal/add', 'API\PaletteController@palCreate')->name('pal.create');
Route::middleware('auth:sanctum')->put('/{pal}/edit', 'API\PaletteController@palEdit')->name('pal.edit');
Route::middleware('auth:sanctum')->delete('/pal/delete/{slug}', 'API\PaletteController@destroy')->name('pal.delete');

// colors
Route::middleware('auth:sanctum')->post('/{palette}/color/add', 'API\ColorController@colorCreate')->name('color.add');
Route::middleware('auth:sanctum')->delete('/color/del/{color}', 'API\ColorController@del')->name('color.delete');

