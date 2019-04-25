import React, {Component} from 'react';
import './styles/Settings.css';

export default class AssignStudent extends React.Component{
    
constructor(props){
    super(props)
    this.state={
        email: "",
        classname: "",
        
    }
    this.handleChange = this.handleChange.bind(this);
    this.handlebuttonfetch = this.handlebuttonfetch.bind(this);
}
handleChange (evt) {
  this.setState({ [evt.target.name]: evt.target.value });
}
handlebuttonfetch(evt){
    evt.preventDefault(evt);
    fetch('http://examapp.crenxu.com:22501/auth/createstudent', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: "Bearer " +(sessionStorage.getItem('jwtToken')),
        'Content-type': 'application/json'

      },
      body: JSON.stringify({
        email: this.state.email,
        classname: this.state.classname,
        
      })
    })
.catch(function(error) {
            console.log(error);
        })
    

  }

validateForm() {
    return this.state.email.length > 0 && this.state.classname.length > 0;
  }
  
    render(){
    return(
      <div>
        <div className="boxcreate">
        <div className="createstudent">
            <h2>Assign student to class</h2>
            
            <div className="createBox">
            <p>Email: </p>
            <input className="input" type="text" autoComplete="off" id="email" name="email" placeholder="Email" onChange={this.handleChange}></input>
            </div>
<br/>
            <div className="createBox">
            <p>ClassName: </p>
      <input className="input" autoComplete="off" type="classname" id="classname" name="classname" placeholder="classname" onChange={this.handleChange} ></input>
      </div>
      <br/>

      <button disabled={!this.validateForm()} onClick={this.handlebuttonfetch}>SUBMIT</button>
</div>
</div>


</div>
    )
}
}