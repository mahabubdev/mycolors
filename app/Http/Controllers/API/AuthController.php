<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;
use Hash;

class AuthController extends Controller
{
    # Login 
    public function login(Request $req)
    {
        // Login Controller
        $redData = Validator::make($req->all(), [
            'username'  =>  ['required', 'string'],
            'password'  =>  ['required', 'string']
        ]);

        // Validation after logics
        if ($redData->fails())
        {
            // when request data will not validated | Validation Error
            return response()->json($redData->messages(), 400);
        }

        else {
            // when validation has no error | Proced next logics
            $val = $redData->validated();
            // de-structure into an array
            $loginData = [
                'username'  =>  $val['username'],
                'password'  =>  $val['password']
            ];

            // Now try catch LOGIN operations

            try {
                // check if user exists or not
                $userCheck = \App\User::where('username', $loginData['username'])->first();
                if ($userCheck) {
                    // so user is really exists now
                    $checkPassword = Hash::check(
                        $loginData['password'],
                        $userCheck->password
                    );
                    // check password is correct or wrong ?
                    if ($checkPassword) {
                        // password is correct now

                        Auth::attempt($loginData); // attempt as logged in
                        // creating the access token
                        $accessToken = auth()->user()
                                        ->createToken('authToken')
                                        ->plainTextToken;
                        
                        // Return response 
                        return response()->json([
                            'msg'           =>  'Login Successfull!',
                            'access_token'  =>  $accessToken,
                            'user'          =>  auth()->user(),
                            'profile'       =>  auth()->user()->profile()->get(),
                            'loginerr'      =>  false
                        ], 202);
                    }
                    else {
                        // password is wrong ... 
                        // Return response 
                        return response()->json([
                            'msg'           =>  'Incorrect password!',
                            'access_token'  =>  null,
                            'user'          =>  null,
                            'profile'       =>  null,
                            'loginerr'      =>  true
                        ], 401);

                    }
                }
                else {
                    // user doesn't exists
                    // Return response 
                    return response()->json([
                        'msg'           =>  'User doesn\'t exists!',
                        'access_token'  =>  null,
                        'user'          =>  null,
                        'profile'       =>  null,
                        'loginerr'      =>  true
                    ], 404);
                }
            }
            catch(Execption $error){
                // Server or Frontend issue may be
                // Return response 
                return response()->json([
                    'msg'           =>  'Unknown Error occured!',
                    'access_token'  =>  null,
                    'user'          =>  null,
                    'profile'       =>  null,
                    'loginerr'      =>  true,
                    'errors'        =>  $error
                ], 400);
            }
        }

    }
}
