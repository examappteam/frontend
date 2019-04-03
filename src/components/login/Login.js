import React from 'react';
import './styles/App.css';
import jwt_decode from 'jwt-decode'
export default class Login extends React.Component{
    

    constructor(props){

        super(props)
       
        
        this.state = {
          asd:"",
            token: "",
            email: "",
            teacherEmail: "",
            password: "",
            identity: "",
            role: "",
            loggedinStudent: false,
            loggedinTeacher: false,
            error: false,
            
        };

        this.handleChange = this.handleChange.bind(this);
        //this.handleButton = this.handleButton.bind(this);
        this.handlebuttonfetch = this.handlebuttonfetch.bind(this);
        //this.getChange = this.getChange.bind(this);
        //this.logout = this.logout.bind(this);
        //this.getDecodedTokenData = this.getDecodedTokenData.bind(this);
        
    }
    setToken(idToken){
      sessionStorage.setItem('jwtToken', idToken.accessToken);
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
      var trimmedDecode = jwt_decode(this.state.token.accessToken);
      console.log(trimmedDecode);
      var trimmedName = trimmedDecode.sub;
      console.log(trimmedName);
      return trimmedName;
    }

    /*getDecodedTokenData(evt){
      evt.preventDefault(evt);
      //var tokenString = this.state.token.toString();
      
      //var decoded = tokenString.substring(0, ((tokenString.length) - 3));
      
      //var code = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHVkZW50IiwiQVVUSCI6W3siYXV0aG9yaXR5IjoiUk9MRV9TVFVERU5UIn1dLCJpYXQiOjE1NTM4NDY1NDQsImV4cCI6MTU1MzkzMjk0NH0.-WBlrpllGFVtzt_pq-p_9FKXnbR5wo6zMjY2ApHKnIuQCHlE7ZGWU5rRVxuHzU_M9-OYaJkoReGn4mMZvUkBYQ";
      var trimmedDecode = jwt_decode(this.state.token.accessToken);
      console.log(trimmedDecode);
      var trimmedName = trimmedDecode.sub;
      console.log(trimmedName);
      
    }*/

    isTokenExpired(token){
      
        if(token.status !== 200){
          console.log("Error et pääse sisään")
          return false;
        }
        else{
          console.log('Yee sisällä');
          return true;
        }
        
        
      }
      // Kirjaudutaan ulos
    /*logout(){
      sessionStorage.removeItem('jwtToken');
    }*/

    loggedIn(){
      const token = this.getToken()
      return !!token && !this.isTokenExpired(token)
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
      }
      else{
      console.log(data.status);
      this.setToken(data);
      
      // Laitetaan krypto data stateen että saadaan avain jolla saadaan rooli käyttäjälle
      this.setState({
        token: data
      })
      this.state.role = this.getTokenDataRole();
      if(this.state.role === "student"){
        this.loggedinStudent = true;
      this.props.history.push("/studentdashboard");
      }
      if(this.state.role === "teacher"){
        this.loggedinTeacher = true;
        this.props.history.push("/teacherdashboard");
      }
      else{
        console.log("Jokin meni pieleen loginissa")
      }
       //console.log(data);
       //console.log("Onnisui");
      }
      })
      
    }
    /*getChange (evt) {
      evt.preventDefault(evt);
      console.log(JSON.parse(sessionStorage.getItem('jwtToken')));
    }*/
   
    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }

    
      /*handleButton(evt) {
       
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
    }*/
    

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
    <button disabled={!this.validateForm()} onClick={this.handlebuttonfetch}>SUBMIT</button>

      </form>
   </div>
   
   </div>
   
    );
}
}
