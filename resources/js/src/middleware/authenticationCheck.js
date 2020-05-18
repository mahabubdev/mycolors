import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";


const checkAuth = () => {
    // init auth reducer
    const authState = useSelector((state) => state.authReducer);

    useEffect( () => {
        authState.isAuthenticated === true ?
        (
            null
        ) : (
            <Redirect to="/login" />
        )
    }, [authState]);
}

export default checkAuth;