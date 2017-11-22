import React from 'react';
import ReactDOM from 'react-dom';
import {Home} from './home.jsx';
import {Slider} from './slider.jsx';
import {Quiz} from './quiz.jsx';
import {InfoTable} from './infotable.jsx';
import {NotFound} from './notFound.jsx';
import {Navigation} from './navigation.jsx';
import { Router,
    PropsRoute,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';


class Routing extends React.Component {
    constructor(props){
        super(props);
        this.state = {  
            time: 10,  
        }
    }

    render() {

        return  <Router history={hashHistory}>
            <Route path='/' component={Navigation}>
                <IndexRoute component={Home} />
                <Route path='/slider' component={Slider} time="klkl"/>
                <Route path='/quiz' component={Quiz}/>
                <Route path='/infotable' component={InfoTable}/>
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    }
}

class BookInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {  
            objList: '',  
        }
    }

    componentDidMount() {
        this.objList = [];            
        fetch(`https://celebase-project.firebaseio.com/Actors.json`).then( r =>   r.json() ).then( response => {

            this.objList.push(response);
            console.log(this.objList);

            this.setState({
                objList: this.objList
            })
            console.log(this.state.objList[0][0].surname);
        });
    }

    render(){

        if(this.state.title===null){
            return null
        } else {
           return (
            <div>
                <h1>{this.state.title}</h1>
            </div> 
            )
        }  
    }
}

export {Routing, BookInfo}