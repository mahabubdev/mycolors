import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import Routes from './routes/index';

import "./components/css/index.css";


import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';



function Index( props ) {


    return (
        <Provider store={store}>
            <ReactNotification />
            <Routes />
        </Provider>
    );
}

export default Index;


if (document.getElementById('react')) {
    ReactDOM.render(<Index />, document.getElementById('react'));
}
