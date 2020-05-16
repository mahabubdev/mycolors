import React from 'react';
import ReactDOM from 'react-dom';

function Index() {
    return (
       <div>
           <h2>React SPA wrapper</h2>
       </div>
    );
}

export default Index;


if (document.getElementById('react')) {
    ReactDOM.render(<Index />, document.getElementById('react'));
}
