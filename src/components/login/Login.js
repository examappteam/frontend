import React from 'react';
import './styles/App.css';
import jwt_decode from 'jwt-decode';
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
    setToken(idToken){
      sessionStorage.setItem('jwtToken', idToken.accessToken);
      console.log(sessionStorage.getItem('jwtToken'));
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
      var trimmedDecode = jwt_decode(this.state.token);
      
     
      return trimmedDecode.roles[0];
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
    handlebuttonfetch(evt){
      const _this = this;
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
      
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
            
        }
        
        return response;
    })
      .then(response => response.json())

      .then(data => {
       
      Sessionstorageitems.setToken(data.token);

      this.setState({
        token: data.token
      })

      this.setState({
        role: this.getTokenDataRole()
      })
      
      if(this.state.role === "ROLE_STUDENT"){  
        this.setState({
          loggedinStudent: true
        })

        Auth.setAuthenticatedUser(this.state.loggedinStudent);
      this.props.history.push("/studentdashboard");
      }

      else if(this.state.role === "ROLE_TEACHER"){
        this.setState({
          loggedinTeacher: true
        })

        Auth.setAuthenticatedTeacher(this.state.loggedinTeacher);
        this.props.history.push("/teacherdashboard");
      }

      else{
        console.log("Sth went wrong in login")
      }
      
      })
      .catch(function(error) {
        console.log(error);
        console.log("Virheellinen");
        _this.toggleModal();
        
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
