import React from "react"
import "../style.css"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Auth from './login/Auth';
import jwt_decode from 'jwt-decode';
import MdModal from "../components/common/modals/MdModal"


export default class Header extends React.Component{

    constructor() {
        super()
        this.state = {
            showState: false
        }
        this.changeShowStateTrue = this.changeShowStateTrue.bind(this);
        this.changeShowStateFalse = this.changeShowStateFalse.bind(this);
    }

    mqtt = require('mqtt');
    options = {
        keepalive: 10,
        clientId: 'studentexample',
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        retain: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        username: 'tidpauhp',
        password: 'wITVbwMtwaMo',
        rejectUnauthorized: false
      }
    client;
    hostName = "wss://m24.cloudmqtt.com:34820";
    logout(){
        
      sessionStorage.removeItem('jwtToken');
      Auth.logOutAuthentication();
    }

    changeShowStateTrue=()=>{
        this.setState({
                showState: true
        });
        console.log("showstate",this.state.showState)
    }

    changeShowStateFalse=()=>{
        this.setState({
                showState: false
        });
        console.log("showstate",this.state.showState)
    }

    componentDidMount() {
        const _this = this;
        const trimmedDecode = jwt_decode(sessionStorage.getItem('jwtToken'));
        console.log(trimmedDecode);
        var trimmedRole = trimmedDecode.roles[0];
        if(trimmedRole === "ROLE_STUDENT") {
            console.log(trimmedRole);
            this.client = this.mqtt.connect(this.hostName,this.options);
            this.client.on('connect', function () {
                console.log("Connected to mqtt")
                _this.client.subscribe("exam-app",{qos:0});
              })
    
            this.client.on('message', function (topic, message) {
                // message is Buffer
                console.log("Exam start message started");
                console.log(topic);
                if(topic === "exam-app") {
                    if(message == "") {

                    }
                    else {
                        console.log(message.toString());
                        const roomName = message.slice(message.indexOf(':') + 1, message.indexOf('|')).toString();
                        console.log(roomName);
                        const examID = message.slice(message.indexOf(':',message.indexOf(':') + 1) + 1, message.indexOf('|', message.indexOf('|')+1)).toString();
                        console.log(examID);
                        const teacherName = message.slice(message.lastIndexOf(':') + 1, message.lastIndexOf('|')).toString();
                        console.log(teacherName);
                        const confimationMessage = teacherName.concat(' invites you to join exam: ').concat(roomName);
                        sessionStorage.setItem('roomToJoin', roomName);
                        sessionStorage.setItem('teacherName',teacherName);
                        const popupText = document.getElementById("popupMessage");
                        popupText.innerText = confimationMessage;
                        _this.changeShowStateTrue();
                    }
                }
              })
        }
    }

    componentWillUnmount() {
        if(this.client != null) {
            this.client.end();
        }
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
                   
                    <MdModal close={this.changeShowStateFalse} show={this.state.showState}>
                            <p id="popupMessage"></p>
                            <Link to="/student_exam_view"><button className="pure-button">Join Exam</button></Link>
                    </MdModal> 
                    
                    
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
