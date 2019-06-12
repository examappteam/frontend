import React, {Component} from 'react';
import './styles/Settings.css';

export default class CreateStudent extends React.Component{
    
constructor(props){
    super(props)
    this.state={
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        roles: "",
        username: "",
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlebuttonfetch = this.handlebuttonfetch.bind(this);
}
handleChange (evt) {
  this.setState({ [evt.target.name]: evt.target.value });
}
handlebuttonfetch(evt){
    evt.preventDefault(evt);
    fetch('http://localhost:22501/auth/createstudent', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: "Bearer " +(sessionStorage.getItem('jwtToken')),
        'Content-type': 'application/json'

      },
      body: JSON.stringify({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        password: this.state.password,
        roles: this.state.roles,
        username: this.state.username,
        
      })
    })
.catch(function(error) {
            console.log(error);
        })
    

  }

validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.firstName.length > 0;
  }
  
    render(){
    return(
      <div>
        <div className="boxcreate">
        <div className="createstudent">
            <h2>Create new student account</h2>
            
            <div className="createBox">
            <p>Email: </p>
            <input className="input" type="text" autoComplete="off" id="email" name="email" placeholder="Email" onChange={this.handleChange}></input>
            </div>
<br/>
            <div className="createBox">
            <p>Password: </p>
      <input className="input" autoComplete="off" type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} ></input>
      </div>
      <br/>

      <div className="createBox">
      <p>First name:</p>
      <input className="input" autoComplete="off" type="text" id="firstname" name="firstName" placeholder="First Name" onChange={this.handleChange} ></input>
      </div>
      <br/>

      <div className="createBox">
      <p>Last name:</p>
      <input className="input" autoComplete="off" type="text" id="lastName" name="lastName" placeholder="Last Name" onChange={this.handleChange} ></input>
      </div>
      <br/>

      <div className="createBox">
      <p>Role:</p>
      <input className="input" autoComplete="off" type="text" id="roles" name="roles" placeholder="Role" onChange={this.handleChange} ></input>
      </div>
      <br/>
      
      <div className="createBox">
      <p>Username:</p>
      <input className="input" autoComplete="off" type="text" id="username" name="username" placeholder="Username" onChange={this.handleChange} ></input>
      </div>
      <br/>
      
      <button disabled={!this.validateForm()} onClick={this.handlebuttonfetch}>SUBMIT</button>
</div>
</div>


</div>
    )
}
}
