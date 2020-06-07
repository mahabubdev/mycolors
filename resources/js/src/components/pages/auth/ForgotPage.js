import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import notifier from './../../../utils/notify'
import axios from 'axios'
import { apiHeader, apiURL } from './../../../config/Axios'



const ForgotPage = (props) => {
    // local states
    const [reqToken, setReqToken] = useState({request: false}) // check get_token requested or not
    const { request } = reqToken
    /**
     * Sending Forget password ->> Reset password Request
     */
    const [req, SetReq] = useState({ username: null })
    const { username } = req;
    // onchangeREQ
    const onchangeReq = (e) => {
        SetReq({
            ...req,
            [e.target.name]: e.target.value
        })
    }
    // onSubmitREQ
    const onsubmitReq = async (e) => {
        e.preventDefault()
        // check tiny validations
        if ( (req.username === null) || (req.username === '') ) {
            // didn't input anything
            notifier('warning', 'Empty fields!', 'You must fill-up all of them') 
        }
        else if (req.username.length <= 3) {
            notifier('warning', 'Short username!', 'Need minimum 4 characters') 
        }
        else {
            // OK to go, No more Errors
            await axios.post(apiURL + '/forget', req, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(res => {
                setReqToken({
                    ...reqToken,
                    request: true
                })
                notifier('success', `${res.data.message}`, 'Verification code will be valid for only 15 minutes')
            })
            .catch(err => {
                notifier('danger', `${err.response.data.errors}`, 'Sorry! According to this username we don\'t have anyone')
            })
        }
    }


    /**
     * When request, Then ....
     */
    const [resetForm, setResetForm] = useState({
        verify: null, newpwd: null, cpwd: null 
    }) // Reset password form's state
    const { verify, newpwd, cpwd } = resetForm
    // onChangeRESETform
    const onchangeResetForm = (e) => {
        setResetForm({
            ...resetForm,
            [e.target.name]: e.target.value
        })
    }
    //onSubmitRESETform
    const onsubmitResetForm = async (e) => {
        e.preventDefault()
        // check for validationns
        if ( (resetForm.verify === null) || (resetForm.cpwd === null) || (resetForm.newpwd === null) ) {
                // when every fileds are empty
                notifier('warning', 'Empty fields!', 'You must fill-up all of them')         
             }

             else if ( (resetForm.verify === '') || (resetForm.cpwd === '') || (resetForm.newpwd === '') ) {
                notifier('warning', 'Empty fields!', 'You must fill-up all of them')   
            }
            // min-lenghts
            else if ( resetForm.verify.length <= 50 ) {
                notifier('warning', 'Invalid Token!', 'Your token-key is not valid')
            }

            else if ( resetForm.newpwd.length <= 7 ) {
                notifier('warning', 'Short password!', 'Minimum 8 characters needed')
            }

            else if ( resetForm.newpwd != resetForm.cpwd ) {
                notifier('warning', 'Passwords mismatched!', 'Passwords should be equal/matched to each other')
            }

             else {
                 // everything is good now... send to backnd
                 //console.log('Requesting ...')
                 //alert('Errors done!')
                 await axios.put(apiURL + '/forget', resetForm, {
                     headers: { 'Content-Type': 'application/json' }
                 })
                 .then( res => {
                     notifier('success', `${res.data.message}`, 'Please Login or check email')
                     setReqToken({
                        ...reqToken,
                        request: false
                    })
                 } )
                 .catch( err => {
                     notifier('danger', 'Error occured!', `${err.response.data.errors}`)
                 })
             }




    }


    // return
    return(
        <div className="auth-page">
            <h2>Forgot Password</h2>
            <hr />
            { 
                reqToken.request ? (
                    <form className="form" onSubmit={ e => onsubmitResetForm(e) }>
                        <span className="my-2 bg-warning text-dark text-center px-5 d-block">
                            Don't refresh this page until send reset resquest
                        </span>
                        <input type="password" name="newpwd" onChange={onchangeResetForm} placeholder="New Password"  /> <br />
                        <input type="password" name="cpwd" onChange={onchangeResetForm} placeholder="Confirm Password"  /> <br />
                        <input name="verify" onChange={onchangeResetForm} placeholder="Verification Token"  /> <br />
                        <button className="btn" type="submit">Reset</button>
                        <hr />
                        <p>
                            Need an account ? <NavLink to="/register">Create an account</NavLink> <br />
                            <NavLink to="/home"> | Go Back | </NavLink>
                            <NavLink to="/login"> | Login | </NavLink>
                        </p>
                    </form>

                ) : (

                    <form className="form" onSubmit={ e => onsubmitReq(e) }>
                        <input name="username" onChange={onchangeReq} placeholder="Username"  /> <br />
                        <button className="btn" type="submit">Get Token</button>
                        <hr />
                        <p>
                            Need an account ? <NavLink to="/register">Create an account</NavLink> <br />
                            <NavLink to="/home"> | Go Back | </NavLink>
                            <NavLink to="/login"> | Login | </NavLink>
                        </p>
                    </form>
                )
            }
        </div>
    )
}

export default ForgotPage