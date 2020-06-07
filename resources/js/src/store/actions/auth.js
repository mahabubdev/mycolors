import {
    LOGIN_SUCCESS,
    LOGIN_ERR,
    LOAD_USER,
    REG_SUCCESS,
    REG_ERR,
    LOGOUT,
    UPDATE_PROFILE
} from "./types";


import axios from "axios";
import { apiHeader, apiURL } from './../../config/Axios';



import notifier from '../../utils/notify';





// load user data
export const loadUser = () => {
    return function (dispatch) {
        // get request User Data
        //console.log(axios.defaults.headers.common['Authorization']);
        axios.get(apiURL + '/user', apiHeader)
        .then( resposne => {
            console.log('User data loaded ...!')
            dispatch({
                type: LOAD_USER,
                payload: resposne.data
            })
            
        })
        .catch(error => {
            //notifier('danger', 'Registration failed!', `${error.response.data.error}`)
        })
    }
}




export const registerReq = (data) => {
    return function (dispatch) {
        // send reg data 
        axios.post(apiURL + '/register', data, apiHeader)
        .then(response => {
            console.log(response.data)
            dispatch({
                type: REG_SUCCESS,
                payload: response.data
            })
            notifier('success', 'Registration successfull!', 'You are now a part of this tiny community')
        })
        .catch(errors => {
            console.log(errors.response.data)
            dispatch({
                type: REG_ERR,
                payload: errors
            })
            notifier('danger', 'Registration failed!', `${errors.response.data.error}`)
        })
    }
}




export const loginReq = (data) => {

    return function (dispatch) {
        // post data 
    axios.post(apiURL + '/login', data, apiHeader)
     .then( resposne => {
         console.log('Login Successfull ... ')
         console.log(resposne.data)
         dispatch({
                type: LOGIN_SUCCESS, 
                payload: resposne.data
         })
         // notify
         notifier('success', 'Login successfull!', 'You are logged-in now ...')


     })
     .catch(error => {
         //console.log('Login Failded or gone wrong ... ')
         //console.log(error)
         dispatch({type: LOGIN_ERR})
         notifier('danger', 'Login failed!', `${error.response.data.msg}`)
         //return { type: LOGIN_ERR }
     });
    }

}


export const updateProfile = (data) => {
    return function (dispatch) {
        dispatch({
            type: UPDATE_PROFILE,
            payload: data
        })
        //notifier('info', 'Profile Updated!', )
    }
}


// Logout 
export const logOut = async () => {
    return function(dispatch) {
        axios.post(apiURL + '/logout', apiHeader)
        .then( res => {
            console.log('Logging out ...')
            dispatch({
                type: LOGOUT
            })
            notifier('warning', 'Logged-out!', 'You are logged-out now')
        })
        .catch(err => {
            console.log('Logout operation failed ...')
            notifier('danger', 'Error occured!', 'Log-out operation falied!')
        })
    }
}




