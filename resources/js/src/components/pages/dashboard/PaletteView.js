import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { apiHeader, apiURL } from './../../../config/Axios';
import { NavLink } from 'react-router-dom';
import "../../css/palettes.css";

function PaletteView (props) {
    // fetch palette data from backend according to the slug
    const [page, setPage] = useState({check: false});
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState({status: false});

    // form
    const [color, setColor] = useState({
        hexcode: ''
    });

    // de-structured
    const { check } = page;
    const { status } = loaded;
    const { hexcode } = color;


    // Form handles
    const onchangeData = (e) => {
        setColor({
            ...color,
            [e.target.name]: e.target.value
        })
    }

    const onFormSend = () => {
        axios.post(apiURL + `/${props.match.params.palette}/color/add`, color, apiHeader)
        .then( response => {
            console.log(response.data)
            window.location.reload(false)
        })
        .catch(err => {console.log(err)})
    }


    // check current page
    useEffect(() => {
        if (props.match.path == '/dashboard/palette/:palette') {
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

    //
    return (
        <div>
            <h2>Palette View Page</h2>
            <span className="bg-danger py-1 px-2 text-white">{ props.match.params.palette }</span>

            <div>
                <strong>Palette Author: </strong> {loaded.status ? data.getData.author : 'Loading ...'}
                <hr />
                <div className="d-flex justify-content-between align-center">
                    <form className="color-add my-2 col-md-8 col-sm-10" onSubmit={onFormSend} onChange={onchangeData}>
                        <input type="text" className="col-md-8 col-sm-6 col-xs-6 mr-3 py-2" name="hexcode" placeholder="Insert Color (HexCode)" />
                        <button className="btn btn-h" type="submit">Insert</button>
                    </form>
                    <div className="col-md-4 my-2 pt-1">
                        <NavLink className="btn btn-lg btn-warning d-inline" to={`/dashboard/edit/${props.match.params.palette}`}>Edit</NavLink>
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
                                                    () => {
                                                        navigator.clipboard.writeText(c.hexcode); // set Copy to Clipboard
                                                    }
                                                }>
                                                    { c.hexcode }
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

export default PaletteView