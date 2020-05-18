import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        //console.log('Axios Header:Authorization setuped!');
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;