import axios from 'axios';

const setAuthToken = (token) => {
    if(token) {
      window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }else {
        delete window.axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken;