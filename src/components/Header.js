import React from "react"
import "../style.css"
import { BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import Auth from './login/Auth';


export default class Header extends React.Component{
 
    checkWhichDashboard(){
        
        if(Auth.studentIsAuthenticated()){
            console.log("StudentDashBoard");
            //this.a();
           //return <Redirect to="/studentdashboard"/>
            //this.props.history.push("/studentdashboard");
        }
        else if(Auth.teacherIsAuthenticated()){
            console.log("TeacherDashBoard");
            this.a();
            //return <Redirect to="/teacherdashboard"/>
            //this.props.history.push("/teacherdashboard");
        }
        else{
            this.logout();

        }
    }
    a(){
        this.props.history.push("/studentdashboard");

    }
    checkWhichSettings(){
        
        console.log("Täällä");
        if(Auth.studentIsAuthenticated()){
            console.log("StudentSettings");
            return <Redirect to="/studentsettings"/>
            //this.props.history.push("/studentsettings");
        }
        else if(Auth.teacherIsAuthenticated()){
            console.log("TeacherStudentSettings");
            return <Redirect to="/settings"/>
            //this.props.history.push("/settings");
        }
        else{
            this.logout();
        }
    }
//<Link to ="/settings"> <button id="logout-button" className="pure-button button-secondary">Settings</button></Link>
//<Link to="/teacherdashboard"><button id="logout-button" className="pure-button pure-button-primary"><i class="fa fa-user-circle fa-lg"></i> Dashboard</button></Link>  
//<button id="logout-button" onClick={this.checkWhichSettings} className="pure-button button-secondary">Settings</button>
//<button id="logout-button" onClick={this.checkWhichDashboard} className="pure-button pure-button-primary"><i class="fa fa-user-circle fa-lg"></i> Dashboard</button>               

 // Kirjaudutaan ulos
    logout(){
        
      sessionStorage.removeItem('jwtToken');
      Auth.logOutAuthentication();
    }

    render(){
    return (
        <header className="navbar">
        
            <div className="pure-g">
                <div className="pure-u-1 pure-u-md-1-3"></div>
                <div className="pure-u-1 pure-u-md-1-3">
                    <img id="logo" src="images/examapp-logo.png" alt="Examapp"></img>
                </div>
                <div className="pure-u-1 pure-u-md-1-3">                
                    <Link to="/student_exam_view"><button className="pure-button">Student exam page #REMOVE#</button></Link> 
                    <Link to="/"> <button id="logout-button" onClick={this.logout} className="pure-button button-error"><i className="fa fa-sign-out-alt fa-lg"></i> Logout</button></Link>
                    <Link to ="/settings"> <button id="logout-button" className="pure-button button-secondary">Settings</button></Link>
                    <Link to="/teacherdashboard"><button id="logout-button" className="pure-button pure-button-primary"><i className="fa fa-user-circle fa-lg"></i> Dashboard</button></Link>
                </div>
            </div>
        </header>
    )
}
}
