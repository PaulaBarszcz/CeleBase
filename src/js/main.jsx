import React from 'react';
import ReactDOM from 'react-dom';
import {Routing} from './components/routing.jsx';
import {BookInfo} from './components/routing.jsx'

require('../sass/main.scss');

ReactDOM.render(
    <div>
        <BookInfo isbn="0747532699"/>
        <Routing/>
    </div>,
    document.getElementById('app')
);