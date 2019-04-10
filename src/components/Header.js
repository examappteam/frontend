import React from "react"
import "../style.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Auth from './login/Auth';


export default class Header extends React.Component{
 
    logout(){
        
      sessionStorage.removeItem('jwtToken');
      Auth.logOutAuthentication();
    }

    render(){
        console.log(sessionStorage.getItem('studentAuthenticated'))
    return (
        <header className="navbar">
        
            <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3"></div>
                <div className="pure-u-1 pure-u-md-1-3">
                    <img id="logo" src="images/examapp-logo.png" alt="Examapp"></img>
                </div>
                <div className="pure-u-1 pure-u-md-1-3">                
                    <Link to="/student_exam_view"><button className="pure-button">Student exam page #REMOVE#</button></Link> 
                    
                    
                    { sessionStorage.getItem('teacherAuthenticated') == 'true' ? 
                    <div>
                        <Link to="/"> <button id="logout-button" onClick={this.logout} className="pure-button button-error"><i className="fa fa-sign-out-alt fa-lg"></i> Logout</button></Link>
                    <Link to ="/settings"> <button id="logout-button" className="pure-button button-secondary">Settings</button></Link>
                    <Link to="/teacherdashboard"><button id="logout-button" className="pure-button pure-button-primary"><i className="fa fa-user-circle fa-lg"></i> Dashboard</button></Link>
                    
                    </div>
                    : "" }

                    { sessionStorage.getItem('studentAuthenticated') == 'true' ? 
                    <div>
                        <Link to="/"> <button id="logout-button" onClick={this.logout} className="pure-button button-error"><i className="fa fa-sign-out-alt fa-lg"></i> Logout</button></Link>
                    <Link to ="/studentsettings"> <button id="logout-button" className="pure-button button-secondary">Settings</button></Link>
                    <Link to="/studentdashboard"><button id="logout-button" className="pure-button pure-button-primary"><i className="fa fa-user-circle fa-lg"></i> Dashboard</button></Link>
                    
                    </div>
                    : "" }
                    </div>
            </div>
        </header>
    )
}
}
