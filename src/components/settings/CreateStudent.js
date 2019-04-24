import React, {Component} from 'react';
import './styles/Settings.css';
import pic from './img/download.jpg';
import Modal from '../common/Modal';
import ChangeEmailContent from './ChangeEmailContent';
import ChangePasswordContent from './ChangePasswordContent';

class CreateStudent extends Component{
    
constructor(props){
    super(props)
    this.state={ pswDialogIsOpen: false};
    this.state={ isOpen: false};
    this.state={
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        roles: "",
        username: "",
        
    }
    
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

   

  }

validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
    render(){
    return(
        
        
        <div>
            <h1>Create new student account</h1>
            
            <div className="inputBox">
            <input className="input" type="text" autoComplete="off" id="email" name="email" placeholder="Email" onChange={this.handleChange}></input>
            </div>

            <div className="inputBox">
      <input className="input" autoComplete="off" type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} ></input>
      </div>

      <div className="inputBox">
      <input className="input" autoComplete="off" type="text" id="firstname" name="firstName" placeholder="First Name" onChange={this.handleChange} ></input>
      </div>
      <div className="inputBox">
      <input className="input" autoComplete="off" type="text" id="lastName" name="lastName" placeholder="Last Name" onChange={this.handleChange} ></input>
      </div>

      <div className="inputBox">
      <input className="input" autoComplete="off" type="text" id="roles" name="roles" placeholder="Role" onChange={this.handleChange} ></input>
      </div>
      
      <div className="inputBox">
      <input className="input" autoComplete="off" type="text" id="username" name="username" placeholder="Username" onChange={this.handleChange} ></input>
      </div>
      
      <div className="inputBox"></div>
      <button disabled={!this.validateForm()} onClick={this.handlebuttonfetch}>SUBMIT</button>
</div>

    )
}
}
export default CreateStudent; 