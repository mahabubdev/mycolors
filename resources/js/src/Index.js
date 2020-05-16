import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes/index';

function Index( props ) {
    return (
       <React.Fragment>
           <Routes />
       </React.Fragment>
    );
}

export default Index;


if (document.getElementById('react')) {
    ReactDOM.render(<Index />, document.getElementById('react'));
}
