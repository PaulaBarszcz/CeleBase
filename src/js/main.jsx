import React from 'react';
import ReactDOM from 'react-dom';
import {Routing} from './components/routing.jsx';

require('../sass/main.scss');

document.addEventListener('DOMContentLoaded', function(){

ReactDOM.render(
    <div>
        <Routing/>
    </div>,
    document.getElementById('app')
);

});