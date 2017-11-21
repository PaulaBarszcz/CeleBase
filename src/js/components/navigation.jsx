import React from 'react';
import { 
    Link
} from 'react-router';

class Navigation extends React.Component {
    constructor(props){
        super(props)
    }

    handleNavClick = (e) => {
        let body = document.querySelector("body")
        body.classList.toggle("nav-show");
    }

    render() {

        return <div className="divNav">
            <button className="main-nav-toogle" onClick={e => this.handleNavClick(e)}>
            <span></span>
            <span></span>
            <span></span>
            <strong>Pokaż menu</strong>
            </button>
            <nav className="main-nav">
                <ul>
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/slider">SLIDER</Link></li>
                    <li><Link to="/quiz">QUIZ</Link></li>
                    <li><Link to="/infotable">INFOTABLE</Link></li>
                </ul>
            </nav>
            {this.props.children}
            
        </div>

    }
}

export {Navigation}