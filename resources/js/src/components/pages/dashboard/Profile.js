import React, {useEffect, useState} from "react";
import { GoArchive, GoDiffIgnored, GoEye } from "react-icons/go";
import "../../css/profile.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { apiHeader, apiURL } from './../../../config/Axios';
import  TimeAgo  from 'react-timeago';




function Profile (props) {

    const [prof, setProf] = useState({
        profile: null,
        user: null
    });
    const [loadDone, setLoadDone] = useState({
        status: false
    });
    const [pageNow, setPageNow] = useState({check: false})

    const { profile, user } = prof; // de-structured ...
    const { status } = loadDone;
    const { check } = pageNow;


    useEffect( () => {
        if (props.location.pathname === '/dashboard/profile' && loadDone.status === false) {
            setPageNow({
                ...pageNow,
                check: true
            })
        }
    }, [] )



    useEffect( () => {

        //console.log(props.location.pathname)

        if (pageNow.check === true) {

            axios.get(apiURL + `/profile`, apiHeader)
            .then( res => {
                console.log(res.data)
                setProf({
                    ...prof,
                    profile: res.data.profile[0],
                    user: res.data.user
                })
            })
            .then( () => {
                setLoadDone({
                    ...loadDone,
                    status: true
                })
            })
            .catch(err => {
                console.log(err)
            }) 

        }        

    }, [pageNow])
    

    const userPhoto = loadDone.status ? prof.profile.photo : 'default.png'

    //
    return (
        <div className="profile-page">
            <h2>Your Profile</h2>

            <div className="wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 user-bio">
                            <div className="user-photo">
                                <img src={`/storage/users/${userPhoto}`} title={ loadDone.status ? (prof.user.name) : 'Loading' } />
                            </div>
                            <div className="user-info mt-3 px-3">
                                <span className="text-bold d-block">
                                    Name : { 
                                    loadDone.status ? prof.user.name : 'Loading ...'
                                } </span>
                                <span className="text-bold d-block">
                                    Username : { 
                                    loadDone.status ? (
                                        <span className="badge badge-primary px-2 py-1">{prof.user.username}</span>
                                    ) : 'Loading ...'
                                } </span>
                                <span className="text-bold d-block">
                                    Joined { 
                                    loadDone.status ? (
                                        prof.user.created_at ? (
                                            <span className="badge badge-success px-2 py-1 text-white">
                                                <TimeAgo date={prof.user.created_at} />
                                            </span>
                                        ) : (
                                            <span className="badge badge-info px-2 py-1 text-white">Unknown</span>
                                        )
                                    ) : 'Loading ...'
                                } </span>
                            </div>
                        </div>
        
                        <div className="col-md-8 user-profile">
                            <div className="profile-data">
                                <div className="d-flex w-100 justify-content-between fl-de-c">
                                    <h3 className="mb-3">Personal Informations</h3>
                                    <NavLink className="btn btn-h d-inline-block" to="/dashboard/profile/edit">Edit Profile</NavLink>
                                </div>
                                <div className="pdata-list">
                                    <ul className="list-none pd-0 m-0">
                                        <li>Email Address : <span>{ loadDone.status ? (prof.user.email) : 'loading...' }</span></li>
                                        <li>Date of Birth : <span>{ loadDone.status ? (<span>{ (prof.profile.dob) ? (prof.profile.dob) : 'Empty' }</span>) : 'loading...' }</span></li>
                                        <li>Gender : <span>{ loadDone.status ? (<span className="text-uppercase">{(prof.profile.gender) ? (prof.profile.gender) : 'Empty'}</span>) : 'loading...' }</span></li>
                                        <li>Address : <span>{ loadDone.status ? (<span> { (prof.profile.address) ? (prof.profile.address) : 'Empty' } </span>) : 'loading...' }</span></li>
                                        <li>Github : <span>{ loadDone.status ? (<a className="pd-0 my-1 btn btn-sm btn-warning d-inline-bock ml-3" target="_blank" href={`${prof.profile.github}`}>{ (prof.profile.github) ? (prof.profile.github) : 'Empty' }</a>) : 'loading...' }</span></li>
                                        <li>Facebook : <span>{ loadDone.status ? (<a className="pd-0 my-1 btn btn-sm btn-warning d-inline-bock ml-3" target="_blank" href={`${prof.profile.facebook}`}>{ (prof.profile.facebook) ? (prof.profile.facebook) : 'Empty' }</a>) : 'loading...' }</span></li>
                                        <li>Instagram : <span>{ loadDone.status ? (<a className="pd-0 my-1 btn btn-sm btn-warning d-inline-bock ml-3" target="_blank" href={`${prof.profile.instagram}`}>{ (prof.profile.instagram) ? (prof.profile.instagram) : 'Empty' }</a>) : 'loading...' }</span></li>
                                        <li>Website : <span>{ loadDone.status ? (<a className="pd-0 my-1 btn btn-sm btn-warning d-inline-bock ml-3" target="_blank" href={`${prof.profile.website}`}>{ (prof.profile.website) ? (prof.profile.website) : 'Empty' }</a>) : 'loading...' }</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;