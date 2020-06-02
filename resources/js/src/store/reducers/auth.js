import {
    LOGIN_SUCCESS,
    LOGIN_ERR,
    LOAD_USER,
    REG_SUCCESS,
    REG_ERR,
    LOGOUT,
    UPDATE_PROFILE,
    UPDATE_USER
} from '../actions/types';

import ls from './../../utils/secureLS'; // secure localStorage Data

// initState
const initState = {
    isAuthenticated: ls.get('token') ? ls.get('token') : null,
    user: ls.get('user') ? ls.get('user') : null,
    //pals: ls.get('plas') ? ls.get('pals') : null,
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
        //ls.remove('pals');
        //console.log(action.payload);
        //localStorage.setItem('token', JSON.stringify(action.payload.access_token));
        ls.set('token', action.payload.access_token);
        ls.set('user', action.payload.user);
        ls.set('profile', action.payload.profile);
        //ls.set('pals', action.payload.pals);
        return {
            ...state,
            isAuthenticated: true,
            user : action.payload.user,
            //pals: action.payload.pals,
            profile: action.payload.profile
        }

        // LOAD USER DATA
        case LOAD_USER: 
        ls.remove('user');
        ls.remove('profile');
        //ls.remove('pals');
        // set them
        ls.set('user', action.payload.access_token);
        ls.set('profile', action.payload.profile);
        //ls.set('pals', action.payload.pals);
        return {
            ...state,
            user : action.payload.user,
            pals: action.payload.pals,
            profile: action.payload.profile
        }

        

        // UPDATE PROFILE STATE
        case UPDATE_USER: 
        return [
            ...state,
            {
                ...user,
                name: action.payload.user.name
            }
        ]

        // UPDATE USER DATA
        case UPDATE_PROFILE: 
        ls.remove('profile');
        ls.set('profile', action.payload.profile);
        return {
            ...state,
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
        //ls.remove('pals');
        // payload
        ls.set('token', action.payload.access_token);
        ls.set('user', action.payload.user);
        ls.set('profile', action.payload.profile);
        //ls.set('pals', action.payload.pals);
        console.log(action.payload)
        return {
            ...state,
            isAuthenticated: true,
            user : action.payload.user,
            pals: action.payload.pals,
            profile: action.payload.profile
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



        // LOGOUT 
        case LOGOUT: 
        // payload
        //console.log(action.payload)
        ls.removeAll()
        return {
            ...state,
            isAuthenticated: false
        }





        default : return state
    }
}