import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store/store';

import Routes from './routes/index';

function Index( props ) {
    return (
    <Provider store={store}>
        <Routes />
      </Provider>
    );
}

export default Index;


if (document.getElementById('react')) {
    ReactDOM.render(<Index />, document.getElementById('react'));
}
