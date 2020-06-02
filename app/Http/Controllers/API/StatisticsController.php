<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    //
    public function getUserSt(Request $req)
    {
        // get every loggedIn users's statistics data

        // get personal statistics
        $myPals = \App\Model\Palette::where('user_id', auth()->user()->id )->get();
        $countMyPals = count($myPals);
        //dd($countMyPals);
        // now get colors
        $containColors = []; // contain colors while loop is running

        if ( $countMyPals > 0 ) {
            // get thier colors
            foreach ( $myPals as $pal ) {
                //$containColors[] = $pal->colors()->get();
                if ( count($pal->colors()->get() ) > 1 ) {
                    // re loop
                    //dd('Re loop');
                    foreach ($pal->colors()->get() as $rp) {
                        // in re-loop
                        $containColors[] = $rp;
                    }
                }
                elseif ( count($pal->colors()->get() ) > 0 ) {
                    $containColors[] = $pal->colors()->first();
                }
                //dd($pal);
            }
        }

        $countMyColors = count($containColors);
        //dd($containColors);
        //return response()->json($countMyColors, 200);

        // get result
        $getResult = [
            'palettes'  =>  $countMyPals,
            'colors'    =>  $countMyColors
        ];

        return response()->json($getResult, 200);




    }

    public function getAdminSt (Request $req)
    {
        // get All privilige statistics data for me / Admin only
        $pals = \App\Model\Palette::all();
        $countPals = count($pals);
        //dd($countPals);
        $users = \App\User::all();
        $countUsers = count($users);

        $colors = \App\Model\Color::all();
        $countColors = count($colors);



        $getResult = [
            'users'     =>  $countUsers,
            'palettes'  =>  $countPals,
            'colors'    =>  $countColors
        ];

        return response()->json($getResult, 200);

        //dd($getResult);
    }
}
