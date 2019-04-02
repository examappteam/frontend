import React from "react"
import "../style.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

function Header() {
    return (
        <header className="navbar">
        
            <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3"></div>
                <div className="pure-u-1 pure-u-md-1-3">
                    <img id="logo" src="images/examapp-logo.png" alt="Examapp"></img>
                </div>
                <div className="pure-u-1 pure-u-md-1-3">                
                    <Link to="/student_exam_view"><button className="pure-button">Student exam page #REMOVE#</button></Link> 
                    <Link to="/"> <button id="logout-button" className="pure-button button-error"><i class="fa fa-sign-out-alt fa-lg"></i> Logout</button></Link>
                    <Link to ="/settings"><button id="logout-button" className="pure-button button-secondary">Settings</button></Link>
                    <Link to="/teacherdashboard"><button id="logout-button" className="pure-button pure-button-primary"><i class="fa fa-user-circle fa-lg"></i> Dashboard</button></Link>                   
                </div>
            </div>
        </header>
    )
}

export default Header