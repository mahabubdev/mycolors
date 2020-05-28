import React, {useEffect, useState} from "react";
import axios from "axios";
import { apiHeader, apiURL } from './../../../config/Axios';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

import "../../css/palettes.css";
import { NavLink } from 'react-router-dom';




function Palette (props) {
    
    const [page, setPage] = useState({check: false});
    const [pals, setPals] = useState([]);
    const [loaded, setLoaded] = useState({status: false});

    // de-structured
    const { check } = page;
    const { status } = loaded;

    // remove item
    const removePal = (pal) => {
        //
        console.log(pal)
        axios.delete( apiURL + `/pal/delete/${pal}` )
        .then(response => {
            console.log(response.data);
            // re-render this page 
            window.location.reload(false)

        })
        .catch(err => {console.log(err)})
    }


    // react-table
    const cols = [{
        Header: 'Palette Name',
        accessor: 'name'
    }, {
        Header: 'Description',
        accessor: 'description'
    }, {
        Header: 'Actions',
        accessor: 'slug',
        Cell: (val) => (
            <React.Fragment>
                <NavLink to={'/dashboard/palette/' + val.value} className="mx-1 btn btn-sm btn-primary">View</NavLink>
                <NavLink to={'/dashboard/edit/' + val.value} className="btn btn-sm btn-warning">Edit</NavLink>
                <button type="button" className="mx-1 btn btn-sm btn-danger" onClick={
                    (e) => {
                        e.preventDefault();
                        //confirm('Are you sure ?')
                        //removePal(val.value)
                        if ( confirm('Are you sure ?') ) {
                            return removePal(val.value)
                        } else {
                            return false
                        }
                    }
                }>Remove</button>
            </React.Fragment>
        )
    }]
    

    useEffect(() => {
        if (props.location.pathname == '/dashboard/pal') {
            setPage({
                ...page,
                check: true
            })
        }
    }, [props]);

    useEffect( () => {
        if (page.check === true) {
            // fetch palettes
            axios.get(apiURL + `/get/pals`, apiHeader)
            .then(response => {
                const parsed = response.data;
                //console.log(typeof(parsed))
                setPals([...pals, parsed])
            })
            .then( () => {
                setLoaded({
                    ...loaded,
                    status: true
                })
                //props.history.push('/dashboard/pal')
            })
            .catch(error => {
                console.log(error);
                //alert('Someting went wrong!')
            })
        }
    }, [page]);

    //
    return (
        <div className="palettes" id="hasModal">
            <h2>Your palettes</h2>

            <div>
                {
                    loaded.status === true ? (
                        <div>
                            <NavLink to={'/dashboard/add/palette'} className="btn btn-success my-2">Add New</NavLink>
                            <ReactTable 
                            data={pals[0]}
                            columns={cols}
                            defaultPageSize={5}  
                            filterable={true}
                            sortable={true}
                            noDataText={"You have no palette yet!"}       
                            />
                        </div>
                    ) : "Loading ..."
                }
            </div>
        </div>
    )
}

export default Palette;