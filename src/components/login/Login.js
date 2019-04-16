import React from 'react';
import './styles/App.css';
import jwt_decode from 'jwt-decode'
import Auth from './Auth';
import Sessionstorageitems from '../common/sessionstorage/Sessionstorageitems';
import MdModal from '../common/modals/SmModal';
export default class Login extends React.Component{
  
    
    constructor(props){
        super(props)
        this.state={ isOpen: false};     
        this.state = {
            token: "",
            email: "",
            teacherEmail: "",
            password: "",
            identity: "",
            role: "",
            loggedinStudent: false,
            loggedinTeacher: false,
            
                    
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlebuttonfetch = this.handlebuttonfetch.bind(this);
    }

    toggleModal = () => {
      this.setState({
        isOpen: !this.state.isOpen
      });
     
    }    

    getToken(){
      return sessionStorage.getItem('jwtToken');
    }

     parseJwt = (token) => {
      try {
        return JSON.parse(token);
      } catch (e) {
        return null;
      }
    };

    getTokenDataRole(){
      console.log("accessToken",this.state.token);
      var trimmedDecode = jwt_decode(this.state.token);
      
      var trimmedName = trimmedDecode.roles[0];
      Sessionstorageitems.setEmail(trimmedName);
      //sessionStorage.setItem('email', trimmedName)
      console.log("Email täällä" + sessionStorage.getItem('email'));
      console.log("Täällä" + trimmedName);
      return trimmedName;
    }
    

    _checkstatus(response){
      if(response.status >= 400 && response.status < 500) {
        console.log("Checkstatus Virheellinen Palautettu False");
        
        return false;
      }else{
        return response;
      }
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handlebuttonfetch(evt){
      evt.preventDefault(evt);
      fetch('http://examapp.crenxu.com:22501/auth/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,     
        })
      })

      .then(response => response.json())      
      
      .then(data => {
        if((this._checkstatus(data)===false)){ 
                 
        console.log(data);
        console.log("Virheellinen");
        
        this.toggleModal();
        
      }

      else{
        console.log(data.token)
      Sessionstorageitems.setToken(data);
      //this.setToken(data);
      
      // Laitetaan krypto data stateen että saadaan avain jolla saadaan rooli käyttäjälle
      this.setState({
        token: data.token
        
      })
      this.setState({
        role: this.getTokenDataRole()
      })
      //this.state.role = this.getTokenDataRole();
      if(this.state.role === "ROLE_STUDENT"){  

        this.setState({
          loggedinStudent: true
        })
        //this.state.loggedinStudent = true;
        Auth.setAuthenticatedUser(this.state.loggedinStudent);
      this.props.history.push("/studentdashboard");
      
      
      
      }

      else if(this.state.role === "ROLE_TEACHER"){
        this.setState({
          loggedinTeacher: true
        }) 
        //this.state.loggedinTeacher = true;
        Auth.setAuthenticatedTeacher(this.state.loggedinTeacher);
        this.props.history.push("/teacherdashboard");
        
        
        
      }

      else{
        console.log("Jokin meni pieleen loginissa")
      }
      }
      })
      
    } 
   
    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }

  render() {    
    
    

    return (
     <div>
      <MdModal show={this.state.isOpen}
                close={this.toggleModal}>
                <h1>Email or Password is wrong</h1>
            </MdModal>
  <div id="m">
  <div className="box">
      <h2>LOGIN</h2> 
      <form>
        <div className="inputBox">
      <input className="input" type="text" id="email" name="email" placeholder="Email" onChange={this.handleChange}></input>
      </div>
      <div className="inputBox">
      <input className="input" type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} ></input>
      </div>
    <button disabled={!this.validateForm()} onClick={this.handlebuttonfetch}>SUBMIT</button>
      </form>
  </div>
  </div>
  </div>
    );
}
}
