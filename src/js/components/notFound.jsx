import React from 'react';
import { 
    Link
} from 'react-router';

class NotFound extends React.Component {
    render() {
        return  <div>
            Page not found. Go back to<Link to="/home">HOME page</Link>
        </div>
    }
}

export {NotFound}