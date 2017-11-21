import React from 'react';
import {Home} from './home.jsx';
import {Slider} from './slider.jsx';
import {Quiz} from './quiz.jsx';
import {InfoTable} from './infotable.jsx';
import {NotFound} from './notFound.jsx';
import {Navigation} from './navigation.jsx';
import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class Routing extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return  <Router history={hashHistory}>
            <Route path='/' component={Navigation}>
                <IndexRoute component={Home} />
                <Route path='/home' component={Home}/>
                <Route path='/slider' component={Slider}/>
                <Route path='/quiz' component={Quiz}/>
                <Route path='/infotable' component={InfoTable}/>
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    }
}

export {Routing}