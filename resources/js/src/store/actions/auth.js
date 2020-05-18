import {
    LOGIN_SUCCESS,
    LOGIN_ERR
} from "./types";

import axios from "axios";
import { apiHeader, apiURL } from './../../config/Axios';

export const loginReq = async (data) => {

    return function (dispatch) {
        //
        // post data 
     axios.post(apiURL + '/login', data, apiHeader)
     .then( resposne => {
         console.log('Login Responsed ... ')
         console.log(resposne.data)
         dispatch({type: LOGIN_SUCCESS})
         //return { type: LOGIN_SUCCESS, payload: resposne.data }
     })
     .catch(error => {
         console.log('Login Failded or gone wrong ... ')
         console.log(error)
         dispatch({type: LOGIN_ERR})
         //return { type: LOGIN_ERR }
     });
    }


    
}
