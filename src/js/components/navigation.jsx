import React from 'react';
import { 
    Link
} from 'react-router';

class Navigation extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return  <div>
            <ul className="navigation">
            <li>
                <Link to="/home">HOME</Link>
            </li>
            <li>
                <Link to="/slider">SLIDER</Link>
            </li>
            <li>
                <Link to="/quiz">QUIZ</Link>
            </li>
            <li>
                <Link to="/infotable">INFOTABLE</Link>
            </li>
            </ul>

            {this.props.children}
        </div>
    }
}

export {Navigation}