<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use File;

class StorageReturnController extends Controller
{
    // User photo return over API calls
    public function userphoto(Request $req)
    {
        $reqPhoto = $req->userpic; // requested user photo file name

        //$destination = storage_path('app/public/users');  // file saved path

        $userphotoURI = File::get('storage/users/' . $reqPhoto);

        return response()->download($userphotoURI);
    }
}
