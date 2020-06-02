<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;
use Hash;

class AuthController extends Controller
{
    ### Login 
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
                            'profile'       =>  auth()->user()->profile()->get()[0],
                            //'pals'          =>  auth()->user()->pals()->get(),
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




    ### LOGOUT -->>
    public function logout(Request $req)
    {
        // revoke auth access snactum token...thats the logout

        //dd(auth()->user()->tokens()->exists());

        try {
            $authToken = auth()->user()->tokens();

            if ($authToken->exists()) {
                $authToken->delete();
                $authToken->where('id', auth()->user()->id)->delete();
                // return message
                return response()->json([
                    'msg'   => 'Logout successfull!'
                ], 200); 
            }
            else {
                // return message
                return response()->json([
                    'error'   => 'Already logged out ... !'
                ], 400); 
            }
        }
        catch(Exeption $error) {
            // return message
            return response()->json([
                'msg'   => 'Operation Error!',
                'error' => $error
            ], 400); 
        }

        
    }






    ### PROFILE edit
    public function editProfile(Request $req)
    {
        // Edit user profile data
        $prData = Validator::make($req->all(), [
            'name'      =>  ['string', 'max:255', 'nullable'],
            'gender'    =>  ['string', 'max:255', 'nullable'],
            'dob'    =>  ['string', 'max:255', 'nullable'],
            'address'    =>  ['string', 'max:255', 'nullable'],
            'github'    =>  ['string', 'max:255', 'nullable'],
            'facebook'    =>  ['string', 'max:255', 'nullable'],
            'instagram'    =>  ['string', 'max:255', 'nullable'],
            'website'    =>  ['string', 'max:255', 'nullable']
        ]);

        // Validation after logics
        if ($prData->fails())
        {
            // when request data will not validated | Validation Error
            return response()->json($prData->messages(), 400);
        }

        else {
            // take validated data
            $prVal = $prData->validated();

            $userP = \App\Model\Profile::where( 'user_id', auth()->user()->id )->first();
            $userD = \App\User::where( 'username', auth()->user()->username )->first();

            //dd($userD);

            //dd(count($prVal));

            if (count($prVal) > 0) {
                // has value for update

                //dd($prVal);
                //userD

                foreach ($prVal as $prf => $v) {
                    // every params has came,, update now
                    if ($prf != "name" ) {
                        $userP->$prf = $v;
                        $userP->save();
                        
                    }
                    elseif ($prf == "name") {
                        $userD->$prf = $v;
                        $userD->save();
                    }

                }

                return response()->json([
                    'message' => 'Profile information updated!',
                    'user'    => auth()->user(),
                    'profile' => auth()->user()->profile()->first()
                ], 201);

            }
            else {
                return response()->json([
                    'message' => 'Nothing to update!',
                    'profile' => null
                ], 400);
            }
        }
    }



    public function editPhoto(Request $req)
    {
        //return response()->json($req->file('photo'), 200);
        //dd($req->file());

        // Edit user profile data
        $prData = Validator::make($req->file(), [
            'photo' => 'mimes:jpeg,jpg,png|dimensions:min_width=120,min_height=150|max:500|min:30'
        ]);

        // Validation after logics
        if ($prData->fails())
        {
            //dd($prData->messages());
            // when request data will not validated | Validation Error
            return response()->json($prData->messages(), 400);
        }

        else {
            $destination = storage_path('app/public/users');  // file saving path
            //dd('passed');
            //dd($prData->validated());
            // take validated data
            $prVal = $prData->validated();

            //dd($prVal['photo']);
            $photo = $prVal['photo'];
            //$pName = $photo->getFilename();
            $extn = $photo->getClientOriginalExtension();

            $madeName = uniqid().".".$extn; // file renaming

            $oldPicName = auth()->user()->profile()->first()->photo;
            //dd($oldPicName);

            $userProfile = \App\Model\Profile::where( 'user_id', auth()->user()->id )->first();

            if ( $userProfile->exists() ) {

                //dd($oldPicName);
                // Delete previous photo is not === "default.png"
                if ($oldPicName != "default.png") {
                    //dd('No, delete');
                     \File::delete('storage/users/' . $oldPicName);
                }

                //dd('OK');
                $userProfile->photo = $madeName;
                $userProfile->save();

                //dd(\Storage::disk('local'));

                //dd($userProfile->photo);
                //dd(storage_path('app/public/users'));
                //move($destination,$file_name);
                if ( $photo->move($destination, $madeName) ) {
                    // return
                    return response()->json([
                        'message'   =>  'Profile picture updated!',
                        'profile'     =>  auth()->user()->profile()->first()
                    ], 202);
                }
                //move($destination,$file_name);
            }

            //dd($pName);


            // save photo


            // return

        }
    }







    ### REGISTER
    public function register(Request $req)
    {
        // REGISTER CONTROLLER
        $regData = Validator::make($req->all(), [
            'name'      =>  ['required', 'string', 'min:5', 'max:100'],
            'username'  =>  ['required', 'string', 'min:4', 'max:16'],
            'email'     =>  ['required', 'string', 'email'],
            'password'  =>  ['required', 'string', 'min:8', 'max:191', 'confirmed'],
        ]);

        // Validation after logics
        if ($regData->fails())
        {
            // when request data will not validated | Validation Error
            return response()->json($regData->messages(), 400);
        }

        else {
            // when validation has no error | Proced next logics
            $val = $regData->validated();
            
            // find user by username + email for unique check
            $userName = \App\User::where('username', $val['username']);
            $userEmail = \App\User::where('email', $val['email']);

            $userExist = $userName->exists() || $userEmail->exists();

            if ($userExist) {
                // it means, any of them exists
                if ( $userName->exists() && $userEmail->exists() ) {
                    return response()->json( [
                        'error'     => 'Username / Email taken',
                        'regErr'    =>  true
                    ], 400);
                }

                else if($userName->exists()){
                    //dd("Username taken");
                    return response()->json( [
                        'error'     => 'Username taken. Try different',
                        'regErr'    =>  true
                    ], 400);
                }
                else if($userEmail->exists()){
                    //dd("Email taken");
                    return response()->json( [
                        'error'     => 'Email already exists!',
                        'regErr'    =>  true
                    ], 400);
                }
            } 

            // All error handles gone
            else {
                // USER now ready to create
                //dd('User registered');
                /*
                \App\User::create([
                    'name'      => $val['name'],
                    'username'  => $val['username'],
                    'email'     => $val['email'],
                    'password'  => Hash::make($val['password']),
                ]); */

                $newUser = new \App\User();

                $newUser->name = $val['name'];
                $newUser->username = $val['username'];
                $newUser->email = $val['email'];
                $newUser->password = Hash::make($val['password']);

                $newUser->save();

                \App\Model\Profile::create([
                    'user_id'   =>  $newUser->id
                ]);

                // make him as Logged in
                $loginNow = [
                    'username'  => $val['username'],
                    'password'  => $val['password']
                ];

                Auth::attempt($loginNow); // attempt as logged in
                        // creating the access token
                        $accessToken = auth()->user()
                                        ->createToken('authToken')
                                        ->plainTextToken;




                
                return response()->json( [
                    'msg'     => 'Registration success!',
                    'access_token'  =>  $accessToken,
                    'user'          =>  auth()->user(),
                    'profile'       =>  auth()->user()->profile()->get()[0],
                    'pals'          =>  auth()->user()->pals()->get(),
                    'regErr'    =>  false
                ], 202);
                
            }

            //dd($userEmail->exists());



        }
    }

}
