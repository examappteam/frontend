import React from 'react';
import './styles/App.css';
import getInfo from './GetInfo';

export default class Login extends React.Component{
    

    constructor(props){

        super(props)
       
        
        this.state = {
            token: "",
            email: "",
            teacherEmail: "",
            password: "",
            identity: "",
            loggedinStudent: false,
            loggedinTeacher: false,
            error: false,
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleButton = this.handleButton.bind(this);
        this.handlebuttonfetch = this.handlebuttonfetch.bind(this);
        
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
          
        }),
        
        
      })
      .then(response => response.json())
      
      .then(data => {
        this.setState({
          token: data
          
        })
        .catch(error => {throw(error)});
        console.log(data);
        
      })
      ;
      
  
    }
  
   
    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }

    
      handleButton(evt) {
       
        evt.preventDefault(evt);
        this.state.identity = getInfo();
        console.log(this.state.identity);
        if(this.state.identity === "student" ){
          this.loggedinStudent = true;
          console.log(" Oppilas " + this.loggedinStudent);
        this.props.history.push("/studentdashboard");
      }
      if(this.state.identity === "teacher" ){
        this.loggedinTeacher = true;
        console.log("Ope " + this.loggedinTeacher);
        this.props.history.push("/teacherdashboard");
      }
    }
    

  render() {
    
    return (
      
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
    <button disabled={!this.validateForm()} onClick={this.handleButton}>SUBMIT</button>
      <br />
      <button onClick={this.handlebuttonfetch}>dsa</button>

     

      </form>
   </div>
   
   </div>
   
    );
}
}
