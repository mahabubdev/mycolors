import { 
    LOAD_USER,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REG_FAIL,
    REG_SUCCESS,
    REG_ERROR
} from "./types";

import { useDispatch } from "react-redux"; 


import ls from './../../utils/secureLS';

//setAuthToken-Initial
const AuthTokenInit = async () => {
    try {
        if (ls.get('token')) {
            await setAuthToken(JSON.parse(ls.get('token')));
            //console.log(JSON.parse(localStorage.getItem('token')));
            //console.log('Token setuped')
        }
        else {
            console.log('Token is not set');
        }
    }
    catch(err) {
        console.log('ERROR!');
        console.log(err);
    }
}
AuthTokenInit(); // checking token for already logged in or not

// Load User
    const loadUser = async () => {
        // load a user infos
        try {
            if (ls.get('token')) {
                setAuthToken(JSON.parse(ls.get('token')))
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await axios.get(baseURL + '/auth/user', config);

            useDispatch({
                type: 'LOAD_USER',
                payload: res.data
            });

        }
        catch (err) {
            useDispatch({
                type: 'LOGIN_ERROR'
            });
        }
    };

/*
const loadUser = () => {
    return {
        type: LOAD_USER
    }
}; */

// User Login
const login = async (formData) => {
    // user login
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    try {
        await axios.post(baseURL + "/login", formData, config)
        .then(res => {
            console.log(res.data);
            // dispatch
            useDispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data
            });
        })
        .catch(err => {
            console.log(err);
        });
        
        // callign load-user-data-infos
        loadUser();

    } catch(err) {
        useDispatch({
            type: 'LOGIN_FAIL',
            payload: err.response.data
        });
    }
};

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
};

const loginFail = () => {
    return {
        type: LOGIN_FAIL
    }
};

const loginErr = () => {
    return {
        type: LOGIN_ERROR
    }
};

// export all actions
export default{
    login,
    loadUser,
    loginSuccess,
    loginFail,
    loginErr,
};