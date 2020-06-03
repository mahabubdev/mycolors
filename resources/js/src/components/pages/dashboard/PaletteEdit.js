import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { apiHeader, apiURL } from './../../../config/Axios';
import { NavLink } from 'react-router-dom';
import "../../css/palettes.css";
import { GoArchive } from "react-icons/go";
import TimeAgo from 'react-timeago';
import notifier from './../../../utils/notify';


function PaletteEdit (props) {
    // fetch palette data from backend according to the slug
    const [page, setPage] = useState({check: false});
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState({status: false});
    const [formData, setFormData] = useState({
        name: '', desc: ''
    });

    // form
    const [color, setColor] = useState({
        hexcode: ''
    });

    // de-structured
    const { check } = page;
    const { status } = loaded;
    const { hexcode } = color;
    const { name, desc } = formData;


    // Form handles
    const onchangeData = (e) => {
        setColor({
            ...color,
            [e.target.name]: e.target.value
        })
    }

    const onchangeFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const initFormData = (data) => {
        setFormData({
            ...formData,
            name: data.name,
            desc: data.description
        })
    }
    const onFormSend = async (e) => {
        e.preventDefault()
        await axios.post(apiURL + `/${props.match.params.palette}/color/add`, color, apiHeader)
        .then( response => {
            //console.log(response.data)
            notifier('success', `${color.hexcode} saved!`, `${response.data.msg}`);
            window.location.reload(false)
        })
        .catch(err => {
            notifier('danger', `Error occured!`, `${err.response.data.errors}`);
        })
    }

    const onUpdatePal = (data) => {
        console.log(data)
        axios.put(apiURL + `/${props.match.params.palette}/edit/`, data, apiHeader)
        .then(response => {
            //console.log(res.data);
            notifier('success', `${props.match.params.palette} updated!`, `${response.data.message}`);
            window.location.reload(true)
        })
        .catch(err => {
            //console.log(err)
            notifier('danger', `Error occured!`, `${err.response.data.message}`);
        })
    }

    const onDelete = (color) => {
        // delete Color
        axios.delete(apiURL + `/color/del/${color}`, apiHeader)
        .then( response => {
            //console.log(response.data)
            notifier('info', `Color removed!`, `${response.data.message}`);
            window.location.reload(true)
        })
        .catch( err=> {
            //console.log(err)
            notifier('danger', `Error occured!`, `${err.response.data.message}`);
        })
    } 


    // check current page
    useEffect(() => {
        if (props.match.path == '/dashboard/edit/:palette') {
            setPage({
                ...page,
                check: true
            })
        }
    }, [props]);
    // fetch on demand
    useEffect( () => {

        if (page.check === true) {
            // fetch palettes
            axios.get(apiURL + `/pal/${props.match.params.palette}`, apiHeader)
            .then(response => {
                const getData = response.data;
                console.log(getData)
                setData({...data, getData})
            })
            .then( () => {
                setLoaded({
                    ...loaded,
                    status: true
                })
                //props.history.push('/dashboard/pal')
            })
            .catch( error => {
                console.log(error)
                alert('Not found or Error occued!')
                //alert('Someting went wrong!')
            })
        }
    }, [page, props]);

    useEffect( () => {
        if (loaded.status === true) {
            initFormData(data.getData.palette)
        }

    }, [loaded])


    //
    return (
        <div>
            <h2>Palette Edit Page</h2>
            <br />
            <span className="bg-danger py-1 px-2 text-white">{ props.match.params.palette }</span>
            <hr />
            <div>
                <div className="forms py-3">
                    <form onSubmit={ (e) => {
                        e.preventDefault();
                        onUpdatePal(formData)
                    } }>
                        <input name="name" className="my-1 pd-2" 
                            value={ loaded.status ? formData.name : 'loading ...' }
                            onChange={onchangeFormData }
                            contentEditable={true}
                            placeholder="Edit Name" /> <br />
                        <input name="desc" className="my-1 pd-2" 
                            contentEditable={true}
                            value={ loaded.status ? formData.desc : 'loading ...' }
                            onChange={ onchangeFormData }
                            placeholder="Edit Description" /> <br />
                        <button type="submit" className="btn btn-h my-2">Edit</button>
                    </form>
                </div>

                <hr />

                <strong>Palette Author: </strong> {loaded.status ? data.getData.author : 'Loading ...'}
                <br />
                <i>Palette Name : </i> {loaded.status ? data.getData.palette.name : 'Loading ...'} <br />
                <i>Created at : </i> { loaded.status ? (<TimeAgo date={data.getData.palette.created_at} />) : null } <br />
                <i>Updated at : </i> { loaded.status ? (<TimeAgo date={data.getData.palette.updated_at} />) : null }
                <hr />
                <div className="d-flex justify-content-between align-center fl-1100-c">
                    <form className="color-add my-2 col-md-8 col-sm-10" onSubmit={e => onFormSend(e)} onChange={onchangeData}>
                        <input type="text" className="col-md-8 col-sm-6 col-xs-6 mr-3 py-2" name="hexcode" placeholder="Insert Color (HexCode only | Ex. 513FDD)" />
                        <button className="btn btn-h" type="submit">Insert</button>
                    </form>
                    <div className="col-md-4 my-2 edit-link">
                        <NavLink className="btn btn-h" to={`/dashboard/palette/${props.match.params.palette}`}> Go Back</NavLink>
                    </div>
                </div>
                <br />
                
                {
                    (loaded.status === true && data.getData !== undefined) ?
                    <div className="container-fluid">
                        <div className="row">
                            {
                                data.getData.colors.map(c => (
                                    <div className="col-md-3 colors-card" key={c.id}>
                                        <div className="color-card d-flex justify-content-center align-center" style={
                                            { 
                                                backgroundColor: c.hexcode,
                                                minHeight: '200px'
                                            }
                                        }>
                                            <div>
                                                <button className="btn btn-c" type="button" onClick={
                                                    (e) => {
                                                        //navigator.clipboard.writeText(c.hexcode); // set Copy to Clipboard
                                                        //c.hexcode
                                                        e.preventDefault();
                                                        if ( confirm('Are you sure ?') ) {
                                                            return onDelete(c.id)
                                                        } else {
                                                            return false
                                                        }
                                                    }
                                                }>
                                                    <GoArchive /> - { c.hexcode }
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                        : 
                    ( <div> Loading ... </div> )
                }
            </div>
        </div>
    )
}

export default PaletteEdit