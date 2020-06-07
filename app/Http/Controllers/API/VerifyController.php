<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hash;
use Mail;
use App\User;
use App\Model\Token;

class VerifyController extends Controller
{
    //

    // make verifyToken cutomly and send Email... 
    public function sendEmail( Request $req )
    {
        // find User first
        $findUser = User::where('username', $req->username);
        //dd($findUser->exists());

        if ( $findUser->exists() ) {
            // User really exists in our Database
            /**
             * When the user is exists, i will create veryToken and save it into @Token
             * Then send the email to the user with the _token
             */
            $uniqId = uniqid(); // taking a unique-ID
            // generate the token with all of them
            $tokenBase = $req->username . '-' . $uniqId;  // Raw Token
            $verifyToken = Hash::make($tokenBase); // generated with encrytion
            //dd($verifyToken);

            // Now save it in database-first ... 
            $saveToken              = new Token();
            $saveToken->user_id     = $findUser->first()->id;
            $saveToken->verify_token= $verifyToken;
            $saveToken->save();
            //dd($saveToken->get());

            // Now send Email to the User
            $to_name = $findUser->first()->name; // User's name
            $to_email = $findUser->first()->email; // User's Email-Address

            $mainData = "<div>
            <h1>Forgot your password! Reset it</h1>
            <h2>Copy the token_KEY providen below and put it back to the page</h2>
            <span class='codey'>". $verifyToken ."</span>
            <h4>&copy; <a href='https://github.com/mahabubdev'>mahabubdev</a> | Thanks for being a part of our community</h4>
            </div>";

            $sendData = [
                'name'      => 'MyColors Community (mahabubdev)',
                'body'      =>  $mainData
            ];



            Mail::send('emails.mail', $sendData, function($message) use ($to_name, $to_email) {
                $message->to($to_email, $to_name)
                ->subject('Reset Your Password!');

                $message->from('mdev.mycolors@gmail.com', 'No-reply | MyColors Community');
            });

            return response()->json([
                'message'   =>  'Email has been send!'
            ], 200);




        } else {
            // User not found! 404
            return response()->json([
                'errors' => 'User not found!'
            ], 404);
        }

    }




    // RESET password
    public function resetPassword( Request $req )
    {
        /**
         * When actual user will get his email and put that correctly
         * mark him as verified@email
         * give his access for change/reset his password
         */

         $findToken = Token::where('verify_token', $req->verify);
         //dd($findUser->exists());
         if ( $findToken->exists() ) {
            // TOKEN exists
            /**
             * Check this token is expired or not
             */
            $checkTime = strtotime($findToken->first()->created_at); // Token created-time
            //dd(strtotime($checkTime));
            $currentTime = time(); // Current requested time

            // check expired
            if ( ($currentTime - $checkTime) >= 900 ) {
                // when difference is more than 5 mintues
                //dd('TRUE');
                return response()->json([
                    'errors'    =>  'Token expired!'
                ], 419);
            }
            else {
                // TOKEN is valid and has accessTime 
                //dd('FALSE');
                /**
                 * So, Token is not expired. We can work with it
                 * Now update his passwords as he sent
                 */
                $newPass = $req->newpwd; // new password

                $findUser = $findToken->first()->user()->first();
                //dd($findUser); // working
                $findUser->password = Hash::make($newPass);
                $findUser->save(); // password updated now

                

                $to_name = $findUser->name; // User's name
                $to_email = $findUser->email; // User's Email-Address
                $newPwd = $newPass; // new password

                $mainData = "<div>
                <h1>Congratulations! Password changed.</h1>
                <h2>". $to_name .", your password has been reset</h2>
                <span class='codey center'>". $newPwd ."</span>
                <h4>&copy; <a href='https://github.com/mahabubdev'>mahabubdev</a> | Thanks for being a part of our community</h4>
                </div>";

                $sendData = [
                    'name'      => 'MyColors Community (mahabubdev)',
                    'body'      =>  $mainData
                ];



                Mail::send('emails.mail', $sendData, function($message) use ($to_name, $to_email) {
                    $message->to($to_email, $to_name)
                    ->subject('Successfully reset your password!');

                    $message->from('mdev.mycolors@gmail.com', 'No-reply | MyColors Community');
                });

                return response()->json([
                    'message'   =>  'Password reset successfull!'
                ], 200);



                
            }

         }

         else {
             // TOKEN not found ... 404 / 401
             return response()->json([
                 'errors'   =>  'Wrong / Used token key!'
             ], 401);
         }

    }



}
