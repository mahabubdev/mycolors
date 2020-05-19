import {
    LOGIN_SUCCESS,
    LOGIN_ERR,
    LOAD_USER,
    REG_SUCCESS,
    REG_ERR,
    LOGOUT
} from "./types";


import axios from "axios";
import { apiHeader, apiURL } from './../../config/Axios';







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
            console.log('Load User failed...!')
        })
    }
}

// Logout 
export const logOut = () => {
    return function(dispatch) {
        axios.post(apiURL + '/logout', apiHeader)
        .then( res => {
            console.log('Logging out ...')
            dispatch({
                type: LOGOUT
            })
        })
        .catch(err => {
            console.log('Logout operation failed ...')
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
        })
        .catch(errors => {
            console.log(errors)
            dispatch({
                type: REG_ERR,
                payload: errors
            })
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

     })
     .catch(error => {
         console.log('Login Failded or gone wrong ... ')
         console.log(error)
         dispatch({type: LOGIN_ERR})
         //return { type: LOGIN_ERR }
     });
    }

}




