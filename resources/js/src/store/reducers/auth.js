import {
    LOGIN_SUCCESS,
    LOGIN_ERR
} from '../actions/types';

// initState
const initState = {
    isAuthenticated: null,
    user: null,
    loginError: null,
}

export default function (state = initState, action) {
    //switch action types
    switch(action.type) {
        case LOGIN_SUCCESS: return {
            ...state,
            isAuthenticated: true 
        }
        
        case LOGIN_ERR: return {
            ...state,
            isAuthenticated: false,
            loginError: 'Login fail!'
        }

        default : return state
    }
}