import {
    LOGIN_SUCCESS,
    LOGIN_ERR,
    LOAD_USER,
    REG_SUCCESS,
    REG_ERR
} from '../actions/types';

import ls from './../../utils/secureLS'; // secure localStorage Data

// set Auth Token if authenticated ... 
import setAuthToken from '../../token/setAuthToken';

//setAuthToken-Initial
const AuthTokenInit = async () => {
    const setTokenNow = () => {
        if (ls.get('token')) {
            setAuthToken(ls.get('token'));
            //console.log(JSON.parse(localStorage.getItem('token')));
            console.log('Token setuped')
        }
        else {
            console.log('Token is not set');
        }
    }
    await setTokenNow(); //called
}
AuthTokenInit(); // checking token for already logged in or not

// initState
const initState = {
    isAuthenticated: ls.get('token') ? ls.get('token') : null,
    user: ls.get('user') ? ls.get('user') : null,
    pals: ls.get('plas') ? ls.get('pals') : null,
    profile: ls.get('profile') ? ls.get('profile') : null,
    loginError: null,
}

export default function (state = initState, action) {
    //switch action types
    switch(action.type) {
        // LOGIN SUCCESS
        case LOGIN_SUCCESS: 
        ls.remove('token');
        ls.remove('user');
        ls.remove('profile');
        ls.remove('pals');
        //console.log(action.payload);
        //localStorage.setItem('token', JSON.stringify(action.payload.access_token));
        ls.set('token', action.payload.access_token);
        ls.set('user', action.payload.user);
        ls.set('profile', action.payload.profile);
        ls.set('pals', action.payload.pals);
        return {
            ...state,
            isAuthenticated: true,
            user : action.payload.user,
            pals: action.payload.pals,
            profile: action.payload.profile
        }

        // LOAD USER DATA
        case LOAD_USER: 
        ls.remove('user');
        ls.remove('profile');
        ls.remove('pals');
        // set them
        ls.set('user', action.payload.access_token);
        ls.set('profile', action.payload.profile);
        ls.set('pals', action.payload.pals);
        return {
            ...state,
            user : action.payload.user,
            pals: action.payload.pals,
            profile: action.payload.profile
        }

        // LOGIN_ERROR
        case LOGIN_ERR: 
        return {
            ...state,
            isAuthenticated: false,
            loginError: 'Login fail!'
        }




        // REGISTER SUCCESS
        case REG_SUCCESS: 
        ls.remove('token');
        ls.remove('user');
        ls.remove('profile');
        ls.remove('pals');
        // payload
        ls.set('token', action.payload.access_token);
        ls.set('user', action.payload.user);
        ls.set('profile', action.payload.profile);
        ls.set('pals', action.payload.pals);
        console.log(action.payload)
        return {
            ...state,
            isAuthenticated: true
            //
        }


        // REGISTER ERROR
        case REG_ERR: 
        // payload
        console.log(action.payload)
        return {
            ...state,
            //
        }





        default : return state
    }
}