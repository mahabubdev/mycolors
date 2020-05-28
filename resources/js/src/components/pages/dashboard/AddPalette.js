import React, {useState} from 'react'
import axios from 'axios';
import { apiHeader, apiURL } from './../../../config/Axios';

function AddPalette (props) {
    // forms and others
    const [formData, setFormData] = useState({
        name: '', desc: ''
    });

    const { name, desc } = formData;

    const onChangeData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }

    const onSend = (e) => {
        e.preventDefault();
        // send data
        axios.post(apiURL + '/pal/add', formData, apiHeader)
        .then(response => {console.log(response.data)})
        .catch(error => {console.log(error)});
    }


    // return
    return (
        <div>
            <h2>Add New palette</h2>
            <div className="forms py-3">
                <form onChange={onChangeData} onSubmit={onSend}>
                    <input name="name" className="my-1 pd-2" placeholder="Palette Name" required /> <br />
                    <input name="desc" className="my-1 pd-2" placeholder="Palette Description" required /> <br />
                    <button type="submit" className="btn btn-h my-2">Create</button>
                </form>
            </div>
        </div>
    )
}

export default AddPalette