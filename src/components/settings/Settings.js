import React, {Component} from 'react';
import './styles/Settings.css';
import pic from './img/download.jpg';
import Modal from '../common/Modal';
import ChangeEmailContent from './ChangeEmailContent';
import ChangePasswordContent from './ChangePasswordContent';
import { BrowserRouter as Router, Route, Link} from "react-router-dom"
/*
menuItems = {this.state.users[0]} 
         menuHeader = "Classes"
         users = {0}
*/


class Settings extends Component{
    
constructor(props){
    super(props)
    this.state={ pswDialogIsOpen: false};
    this.state={ isOpen: false};
    this.state={
        email: "a",
        firstName: "",
        lastName: "",
        username: "",
        
        stId: 0,
        stId2: 0,
    }
    
}
    
    componentDidMount(){
        
        var urlAddress = "http://examapp.crenxu.com:22501/auth/user";
        fetch(urlAddress, {
          method: 'GET',
          headers: {
           
            Accept: 'application/json',
            Authorization: "Bearer " +(sessionStorage.getItem('jwtToken')),
            'Content-type': 'application/json'
        }
    })
    
    .then(response => response.json())
    
        .then(data => {
            console.log(data)
            this.setState({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username

            })
            
        })
        .catch(function(error) {
            console.log(error);
        })
    }


toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
   
  }
toggleModal2 = () => {
this.setState({ 
pswDialogIsOpen: !this.state.pswDialogIsOpen
});
} 
    render(){
      
    return(
      
        
        <div>

            <Modal show={this.state.isOpen}
                close={this.toggleModal}>
                <ChangeEmailContent /> 
            </Modal>

            <Modal show={this.state.pswDialogIsOpen}
                close={this.toggleModal2}>
               <ChangePasswordContent />
            </Modal>

            <div id= "settings">
        <div id="mleft">
        <h1>Personal Info</h1>
        
        <div className="pure-g">
        
        <div className="pure-u-1-4">
            

                <img src={pic} alt="d"></img>
                
        </div>

        <div id="settings" class="dropdown">
  <button id="settings" class="dropbtn">Change Information</button>
  <div id="settings" class="dropdown-content">
    
    <input className="buttonchangepswemail" onClick={this.toggleModal} type="button" value="Change Email"/>

    
    
    <input className="buttonchangepswemail" onClick={this.toggleModal2} type="button" value="Change Password" />
    <Link to = "/createstudent"><input className="buttonchangepswemail"  type="button" value="Create student" /></Link>
    

  </div>
</div>
        

        
        
    </div>
    

        <div className="pure-g">
        
    <div className="pure-u-1-2">
        
            <h2>Email</h2> 
            
            
            <br />
            <i>{this.state.email}</i>


    </div>
    
    
    
</div>
        <div className="pure-g">
            <div className="pure-u-1-3">
            
            
            <h2>Name</h2>
            <br />
            <i>{this.state.firstName}</i>
            
            </div>
            <div className="pure-u-1-3">
            
            <h2>Surname</h2>
            <br />
            <i>{this.state.lastName}</i>
            
            </div>
        </div>  
         
                    <div className="pure-g">
                <div className="pure-u-1-2">

                <h2>Username</h2>
                <br />
                <i>{this.state.username}</i>
                
                </div>
                
                    </div>
                    <br />
                    
                    </div>
                    
                    </div>
                    
        </div>
    )
}
}
export default Settings; 