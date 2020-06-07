import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import "../../css/dash-header.css"
import { GoGrabber, GoLinkExternal, GoPerson, GoSignOut } from "react-icons/go";

import { toogleNavSide } from "../../../store/actions/theme"
import { logOut } from "../../../store/actions/auth"
import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';
import { apiHeader, apiURL } from './../../../config/Axios';

import notifier from './../../../utils/notify';

const DashHeader = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector( state => (state.auth) ); // Theme State
    const theme = useSelector( state => (state.theme) ); // Theme State

    const [photo, setPhoto] = useState({url: null})
    const {url} = photo;


    // toggle dropdown user-menu
    const [show, setShow] = useState({ exposed: false });

    const { exposed } = show;

    const toogleMenu = () => {
        // toggle show state
        setShow({
            ...show,
            exposed: ! exposed
        })
        //console.log(show.exposed)
    }

    // from Props

    const toggleSideNav = () => {
        //console.log(props)
        dispatch(toogleNavSide());
    }

    const logOutMe = () => {
        dispatch(logOut());
    }

    /*
    useEffect(() => {
        if (auth.isAuthenticated){
            setPhoto({...photo, url: `/storage/users/${auth.profile.photo}`})
        }
    }, [auth]) */
    /*
    useEffect(() => {
        if (auth.isAuthenticated) {
            axios.get( apiURL + `/storage/${auth.profile.photo}`, apiHeader)
            .then(res => {
                setPhoto({
                    ...photo,
                    url: res.data
                })
            })
            .catch(err => {
                notifier('danger', 'Error occured!', `${err.response.data}`);
            })
        }
    }, [auth]) */
    


    return (
        <div className="dash-header" style={
            theme.sideExpanded ? theme.sidenav.expanded.dashHeader : theme.sidenav.collapsed.dashHeader
        }>
            <div className="nav navbar-nav left">
                <span onClick={ toggleSideNav } className="toogleSideNav"><GoGrabber /></span>
                <NavLink to="/home" className="btn btn-sm btn-info">Go back <GoLinkExternal /></NavLink>
           </div>
           <div className="nav navbar-nav right">
                <div className="user-bar" onClick={toogleMenu}>
                    <strong>{ auth.user.username }</strong>
                    <div className="user-pic">
                        {
                            auth.isAuthenticated ? (<img src={`/api/storage/${auth.profile.photo}`} />) : null
                        }
                    </div>
                    <ul className="user-menu" style={
                            show.exposed ? { display: 'flex' } : { display: 'none' }
                        }>
                        <li><NavLink to="/dashboard/profile"><GoPerson /> Profile</NavLink></li>
                        <li><button type="button" onClick={logOutMe}><GoSignOut /> Logout</button></li>
                    </ul>
                </div>
           </div>
        </div>
    );
}

export default DashHeader;
