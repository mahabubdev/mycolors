import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import { GoOrganization, GoBeaker, GoPaintcan } from 'react-icons/go';
import axios from 'axios';
import { apiHeader, apiURL } from './../../../config/Axios';



function IndexPage ( props ) {

    // select auth
    const auth = useSelector( state => (state.auth) );


    const [ccpage, setCcpage] = useState({pageCheck: false})
    const [loadEnd, setLoadEnd] = useState({done: false});

    const { pageCheck } = ccpage;
    const { done } = loadEnd; 
    
    const [userSta, setUserSta] = useState({
        palettes: null, colors: null
    })
    const { palettes, colors } = userSta;

    const [adminSta, setAdminSta] = useState({
        tpals: null, tusers: null, tcolors: null
    });
    const { tpals, tusers, tcolors } = adminSta;

    // check page first
    useEffect( () => {
        if ( props.location.pathname === '/dashboard' ) {
            setCcpage({...ccpage, pageCheck: true})
            console.log(props)
        }
    }, [] )



    // Fetch User Statistics
    useEffect( () => {
        if (auth.isAuthenticated && ccpage.pageCheck) {
            axios.get( apiURL + '/get/userst', apiHeader )
            .then(res => {
                console.log(res.data)
                setUserSta({
                    ...userSta,
                    palettes: res.data.palettes,
                    colors: res.data.colors
                })
            })
            
            .catch( err => console.log(err))
        }
    }, [ccpage] )


    // get ADMIN statistics
    useEffect( () => {
        if ( auth.isAuthenticated && ( auth.user.username === 'admin' ) && ccpage.pageCheck ) {
            axios.get( apiURL + '/get/adminst', apiHeader )
            .then(res => {
                setLoadEnd({...loadEnd, done: false})
                console.log(res.data)
                setAdminSta({
                    ...adminSta,
                    tpals: res.data.palettes,
                    tusers: res.data.users,
                    tcolors: res.data.colors
                })
                //console.log(adminSta)

                //setLoadEnd({...loadEnd, done: true})
            })
            .then( () => setLoadEnd({...loadEnd, done: true}) )
            .catch( err => console.log(err))
        }
        else {
            setLoadEnd({...loadEnd, done: true})
        }
    }, [ccpage] )







    //console.log(auth)

    // 
    return (
        <div className="page_area">
            <div className="dashboard-page">

                <div className="tiles">
                    <div className="row">

                        { 
                            auth.user.username === 'admin' ? (<React.Fragment>
                                <div className="col-md-4">
                                    <div className="card crypto-card-3 st-cards">
                                    <div className="card-content">
                                            <div className="card-body py-3">
                                                <h4 className="text-white mb-3"><i><GoOrganization /></i> Users</h4>
                                                <h6 className="text-white mb-1">Total Users joined</h6>
                                                <h4 className="text-white text-right">
                                                    { loadEnd.done ? (<span> { adminSta.tusers } </span>): (<span>loading ...</span>) }
                                                </h4>
                                            </div>
                                        </div>     
                                    </div>
                                </div>


                                <div className="col-md-4">
                                    <div className="card crypto-card-3 st-cards">
                                    <div className="card-content">
                                            <div className="card-body py-3">
                                                <h4 className="text-white mb-3"><i><GoPaintcan /></i> Color Palettes</h4>
                                                <h6 className="text-white mb-1">Total Palettes created</h6>
                                                <h4 className="text-white text-right">
                                                    { loadEnd.done ? (<span> { adminSta.tpals } </span>): (<span>loading ...</span>) }
                                                </h4>
                                            </div>
                                        </div>     
                                    </div>
                                </div>



                                <div className="col-md-4">
                                    <div className="card crypto-card-3 st-cards">
                                    <div className="card-content">
                                            <div className="card-body py-3">
                                                <h4 className="text-white mb-3"><i><GoBeaker /></i> Color Codes</h4>
                                                <h6 className="text-white mb-1">Total Colors saved</h6>
                                                <h4 className="text-white text-right">
                                                    { loadEnd.done ? (<span> { adminSta.tcolors } </span>): (<span>loading ...</span>) }
                                                </h4>
                                            </div>
                                        </div>     
                                    </div>
                                </div>










                                <div className="col-md-6">
                                    <div className="card crypto-card-3 st-cards-users mt-4">
                                    <div className="card-content">
                                            <div className="card-body py-3">
                                                <h4 className="text-white mb-3"><i><GoPaintcan /></i> Color Palettes</h4>
                                                <h6 className="text-white mb-1">Total Palettes created</h6>
                                                <h4 className="text-white text-right">
                                                    { loadEnd.done ? (<span> { userSta.palettes } </span>): (<span>loading ...</span>) }
                                                </h4>
                                            </div>
                                        </div>     
                                    </div>
                                </div>



                                <div className="col-md-6">
                                    <div className="card crypto-card-3 st-cards-users mt-4">
                                    <div className="card-content">
                                            <div className="card-body py-3">
                                                <h4 className="text-white mb-3"><i><GoBeaker /></i> Color Codes</h4>
                                                <h6 className="text-white mb-1">Total Colors saved</h6>
                                                <h4 className="text-white text-right">
                                                    { loadEnd.done ? (<span> { userSta.colors } </span>): (<span>loading ...</span>) }
                                                </h4>
                                            </div>
                                        </div>     
                                    </div>
                                </div>


                            </React.Fragment>)
                             : 
                            (
                                <React.Fragment>

                                <div className="col-md-6">
                                    <div className="card crypto-card-3 st-cards-users mt-4">
                                    <div className="card-content">
                                            <div className="card-body py-3">
                                                <h4 className="text-white mb-3"><i><GoPaintcan /></i> Color Palettes</h4>
                                                <h6 className="text-white mb-1">Total Palettes created</h6>
                                                <h4 className="text-white text-right">
                                                    { loadEnd.done ? (<span> { userSta.palettes } </span>): (<span>loading ...</span>) }
                                                </h4>
                                            </div>
                                        </div>     
                                    </div>
                                </div>



                                <div className="col-md-6">
                                    <div className="card crypto-card-3 st-cards-users mt-4">
                                    <div className="card-content">
                                            <div className="card-body py-3">
                                                <h4 className="text-white mb-3"><i><GoBeaker /></i> Color Codes</h4>
                                                <h6 className="text-white mb-1">Total Colors saved</h6>
                                                <h4 className="text-white text-right">
                                                    { loadEnd.done ? (<span> { userSta.colors } </span>): (<span>loading ...</span>) }
                                                </h4>
                                            </div>
                                        </div>     
                                    </div>
                                </div>
                            </React.Fragment>
                           )
                        }


                    </div>
                </div>

            </div>
        </div>
    );
}

export default IndexPage;
