<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

use App\Model\Color;
use App\Model\Palette;

class ColorController extends Controller
{
    //
    public function colorCreate(Request $r)
    {
        // Create color by palette and check no duplicate color in same palette
        $colorValid = Validator::make($r->all(), [
            'hexcode'   =>  ['required', 'string', 'min:7', 'max:7']
        ]);

        if($colorValid->fails()){
            // validation Error found ... 
            return response()->json([
                'errors'    =>  $colorValid->messages()
            ], 400);
        }
        else {
            // data validated
            $validated = $colorValid->validated();

            // check palette
            $checkPal = Palette::where('slug', $r->palette);
            if ($checkPal->exists()){
                // palette OK

                //check hexcode is not duplicate in this palette
                $palID = $checkPal->first()->id;
                $dup = Color::where('palette_id', $palID)->where('hexcode', $validated['hexcode']);

                if ($dup->exists()) {
                    // Duplicate entry found
                    return response()->json([
                        'error'    =>  'Duplicate color entry!'
                    ], 400);
                }
                else {
                    // No duplicate founded ... go on and create the color now ... 
                    //dd($validated);
                    $newColor = new Color();
                    $newColor->hexcode = $validated['hexcode'];
                    $newColor->palette_id = $palID;
                    $newColor->save();

                    return response()->json([
                        'msg'           =>  'Color Added!',
                        'color_info'    =>  $newColor
                    ], 201);
                }
            }
            else {
                // palette is not exists
                return response()->json([
                    'error'    =>  'Palette not found!'
                ], 404);
            }
        }

    }


    public function edit()
    {
        //
    }


    public function del()
    {
        //
    }



    
}
