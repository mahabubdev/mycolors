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
            'hexcode'   =>  ['required', 'string', 'min:6', 'max:6']
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

                // now check author and authUser is same ?
                $nowUser = auth()->user()->id; // current requested user
                $palAuthor = $checkPal->first()->author()->first()->id; // palette author 
                //dd($palAuthor);

                if ($palAuthor === $nowUser) {
                    // Permitted to create
                    //dd('TRUE');
                    //check hexcode is not duplicate in this palette
                    $palID = $checkPal->first()->id; //dd($palID);
                    $dup = Color::where('palette_id', $palID);
                    //dd($dup->exists());
                    $dupAlreadyColor = $dup->where('hexcode', "#" . $r->hexcode);
 
                    //dd($dupAlreadyColor->exists());

                    if ( $dupAlreadyColor->exists() ) {
                        // Duplicate entry found
                        return response()->json([
                            'errors'    =>  'Duplicate color entry!'
                        ], 400);
                    }
                    else {
                        //dd('OKK');
                        // No duplicate founded ... go on and create the color now ... 
                        //dd($validated);
                        $newColor = new Color();
                        $newColor->hexcode = "#" . $validated['hexcode'];
                        $newColor->palette_id = $palID;
                        $newColor->save();  //dd('OKK');

                        return response()->json([
                            'msg'           =>  'Color Added!',
                            'color_info'    =>  $newColor
                        ], 201);
                    }
                }
                else {
                    //dd('FALSE');
                    // Unauthorized 401
                    return response()->json([
                        'errors'    =>  'Unauthorized operation...!'
                    ], 401);
                }

            }
            else {
                // palette is not exists
                return response()->json([
                    'errors'    =>  'Palette not found!'
                ], 404);
            }
        }

    }



    public function del(Request $req)
    {
        // Delete a color
        $color = $req->color;

        $colorFind = Color::find($color);

        if ( $colorFind->exists() ) {
            //dd('TRUE');
            $colorFind->delete();

            return response()->json([
                'message'   =>  'Color deleted successfully!',
                'color'     =>  $colorFind->first()
            ], 200);
        }
        else {
            //dd('FALSE');
            return response()->json([
                'message'  =>  'Operation failed!'
            ], 400);
        }

        //dd($colorFind);

    }



    
}
