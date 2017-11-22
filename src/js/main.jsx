import React from 'react';
import ReactDOM from 'react-dom';
import {Routing} from './components/routing.jsx';
import {FetchInfo} from './components/routing.jsx'

require('../sass/main.scss');

ReactDOM.render(
    <div>
        <FetchInfo isbn="0747532699"/>
        <Routing/>
    </div>,
    document.getElementById('app')
);