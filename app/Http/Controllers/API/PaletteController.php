<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

// models
use App\User;
use App\Model\Palette;
use App\Model\Color;

class PaletteController extends Controller
{
    public function palPage(Request $r)
    {
        // get colors by palette slug && check user is the owner or not
        $slug = $r->slug;

        $findPal = Palette::where('slug', $slug);

        if ($findPal->exists()) {
            // palette really exists

            $palAuthor = $findPal->first()->id;
            $currentUser = auth()->user()->id;

            // check right author or not
            if ( $palAuthor === $currentUser ) {
                // ok, he is right person
                // now u can fetch pal data
                $fecthPal = $findPal->first()->colors()->get();
                $author = $findPal->first()->author()->first()->username;
                //retuen
                return response()->json([
                    'author'    => $author,
                    'colors'    => $fecthPal  
                ], 200);
            }
            else {
                // sorry, unauthorized ...
                return response()->json([
                    'error'    => 'Unauthorized!', 
                ], 401);
            }

        }
        else {
            // not exists
            return response()->json([
                'error'    => 'Palette was not found!', 
            ], 404);
        }
    }




    public function palColors()
    {
        //
    }




    public function palEdit()
    {
        //
    }




    public function palDelete()
    {
        //
    }





    public function palCreate(Request $r)
    {
        // CREATE a new Palette by user as author of that

        $reqData = Validator::make($r->all(), [
            'name'          =>  ['required', 'string', 'min:3', 'max:191'],
            'desc'   =>  ['string', 'max:191'],
        ]);

        // Validation after logics
        if ($reqData->fails())
        {
            // when request data will not validated | Validation Error
            return response()->json($reqData->messages(), 400);
        }

        else {
            // now we have validated data
            $palData = $reqData->validated();
            //dd($palData);
            $generateSlug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $palData['name']))); // generate slug from name


            // check alreay exists or not
            $palFind = Palette::where('slug', $generateSlug);

            if ($palFind->exists()) {
                // pal aleary exists | taken

                $modifySlug = $generateSlug . substr( time(), -3 ); // modify as unique


                $create = new Palette();

                $create->name = $palData['name'];
                $create->slug = $modifySlug;
                $create->description = $palData['desc'];
                $create->user_id = auth()->user()->id;

                $create->save();

                // return 
                return response()->json([
                    'msg'       =>  'Palette created successfully!',
                    'palette'   =>  $create
                ], 201);

            }

            else {
                // slug is OK , now go to create

                $create = new Palette();

                $create->name = $palData['name'];
                $create->slug = $generateSlug;
                $create->description = $palData['desc'];
                $create->user_id = auth()->user()->id;

                $create->save();

                // return 
                return response()->json([
                    'msg'       =>  'Palette created successfully!',
                    'palette'   =>  $create
                ], 201);
            }
        }
    }



}
