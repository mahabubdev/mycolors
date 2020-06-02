import React, {useEffect, useState} from "react";
import { GoArchive, GoDiffIgnored, GoEye } from "react-icons/go";
import "../../css/profile.css";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { apiHeader, apiURL } from './../../../config/Axios';
import  TimeAgo  from 'react-timeago';
//import DatePicker from 'react-date-picker';
import { updateProfile } from "../../../store/actions/auth";
import { useDispatch } from 'react-redux';

import notifier from './../../../utils/notify';




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


    // Edit Form managment
    const [editForm, setEditForm] = useState({
        name: '', dob: '', address: '', gender: '', github: '', website: '', facebook: '', instagram: ''
    })
    const [cphoto, setCphoto] = useState({file: null})

    const { name, dob, address, gender, github, website, facebook, instagram } = editForm;
    const { file } = cphoto;

    const initFormData = (data) => {
        //console.log(data)
        setEditForm({
            ...editForm,
            name: data.user.name,
            dob: data.profile.dob,
            address: data.profile.address,
            gender: data.profile.gender,
            github: data.profile.github,
            website: data.profile.website,
            facebook: data.profile.facebook,
            instagram: data.profile.instagram
        })
    }


    const onchangeForm = (e) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        })
    }

    const dispatch = useDispatch()

    const onUpdateProfile = async (data) => {

        //console.log(data)
        
        await axios.put(apiURL + '/profile/edit', data, apiHeader)
        .then( res => {
            dispatch(updateProfile(res.data))
            notifier('success', 'Profile updated!', `${res.data.message}`);
            //console.log(res.data)
            window.location.reload(true)
        })
        .catch( err => {notifier('danger', 'Error occured!', `${err.response.data.message}`)}) 
    }

    // photo change / update

    const onchangePhoto = e => {
        setCphoto({
            ...cphoto,
            file: e.target.files[0]
        })
    }  

    const onUpdatePhoto = () => {
        let photoData = new FormData()
        photoData.append('photo', cphoto.file)

        axios.post(apiURL + '/profile/photo', photoData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            dispatch(updateProfile(res.data))
            notifier('success', 'Photo updated!', `${res.data.message}`);
            window.location.reload(false)
        })
        .catch(err => {
            //console.log(err)
            notifier('danger', 'Error occured!', `${err.response.data.message}`);
        })
    }














    useEffect( () => {
        if (props.location.pathname === '/dashboard/profile/edit' && loadDone.status === false) {
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


    useEffect( () => {
        // when page loaded
        if (loadDone.status === true) {
            initFormData(prof)
        }
    }, [loadDone])
    

    const userPhoto = loadDone.status ? prof.profile.photo : 'default.png'

    // <input onChange={onchangeForm} name="gender" placeholder="Gender" value={editForm.gender} />
    // <input onChange={onchangeForm} name="dob" placeholder="DoB (Date of Birth)" value={editForm.dob} />

    //
    return (
        <div className="profile-page">
            <h2>Edit Profile</h2>

            <div className="wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 user-bio">
                            <div className="user-photo">
                                <img src={`/storage/users/${userPhoto}`} title={ loadDone.status ? (prof.user.name) : 'Loading' } />
                            </div>
                            <form className="file-inp" encType="multipart/form-data" onSubmit={ e => {
                                e.preventDefault()
                                onUpdatePhoto()
                            } }>
                                <input name="photo" type="file" 
                                 onChange={onchangePhoto}
                                 placeholder="Change Photo"
                                 accept="image/jpeg,image/jpg,image/png"
                                 title="Only JPG|PNG|JPEG and max size < 200kb" />
                                 <button type="submit" className="btn btn-h my-2">Update Photo</button>
                            </form>
                            <div className="user-info mt-3 px-3">
                                <span className="text-bold d-block">
                                    Name : { 
                                    loadDone.status ? (<span> { prof.user.name } </span>) : 'Loading ...'
                                } </span>

                                <span className="text-bold d-block">
                                    Username : { 
                                    loadDone.status ? (
                                        <span className="badge badge-primary px-2 py-1" title="username cannot be updatable!">{prof.user.username}</span>
                                    ) : 'Loading ...'
                                } </span>
                                <span className="text-bold d-block">
                                    Joined { 
                                    loadDone.status ? (
                                        prof.user.created_at ? (
                                            <span className="badge badge-success px-2 py-1 text-white" title="Cannot be updatable!">
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
                            <form className="profile-data" onSubmit={
                                (e) => {
                                    e.preventDefault();
                                    onUpdateProfile(editForm)
                                }
                            }>
                                <div className="d-flex w-100 justify-content-between">
                                    <h3 className="mb-3">Edit Informations</h3>
                                    <button type="submit" className="btn btn-h d-inline-block">Update Profile</button>
                                </div>
                                <div className="pdata-list">
                                    <ul className="list-none pd-0 m-0">
                                        <li>Full Name : <span>{ loadDone.status ? (<input onChange={onchangeForm} name="name" value={editForm.name} placeholder="Full Name" />) : 'loading...' }</span></li>
                                        <li>Email Address : <span>{ loadDone.status ? prof.user.email : 'loading...' }</span></li>
                                        <li>Date of Birth : <span>{ loadDone.status ? (
                                            <input type="date" onChange={onchangeForm} name="dob" placeholder="DoB (Date of Birth)" value={ editForm.dob } />
                                        ) : 'loading...' }</span></li>
                                        <li>Gender : <span>{ loadDone.status ? (
                                            <select name="gender" onChange={onchangeForm}>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        ) : 'loading...' }</span></li>
                                        <li>Address : <span>{ loadDone.status ? (<input onChange={onchangeForm} name="address" placeholder="Address" value={editForm.address} />) : 'loading...' }</span></li>
                                        <li>Github : <span>{ loadDone.status ? (<input onChange={onchangeForm} name="github" placeholder="Github Link" value={editForm.github} />) : 'loading...' }</span></li>
                                        <li>Facebook : <span>{ loadDone.status ? (<input onChange={onchangeForm} name="facebook" placeholder="Facebook Link" value={editForm.facebook} />) : 'loading...' }</span></li>
                                        <li>Instagram : <span>{ loadDone.status ? (<input onChange={onchangeForm} name="instagram" placeholder="Instagram Link" value={editForm.instagram} />) : 'loading...' }</span></li>
                                        <li>Website : <span>{ loadDone.status ? (<input onChange={onchangeForm} name="website" placeholder="Your Website Link" value={editForm.website} />) : 'loading...' }</span></li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;